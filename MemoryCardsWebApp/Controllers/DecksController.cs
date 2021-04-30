using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.DtoEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DecksController : ControllerBase
    {
        private MemoryCardsContext dbContext;

        public DecksController(MemoryCardsContext context)
        {
            dbContext = context;
        }

        [Authorize]
        [HttpGet("GetDecksByUserToken")]
        public IActionResult GetDecksByUserToken()
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                int userId;
                string claimName = identity.Name;
                bool succeded = int.TryParse(claimName, out userId);

                List<Deck> decks =
                    dbContext.Decks.FromSqlRaw(
                        $"SELECT * FROM Decks WHERE id IN (SELECT DeckId FROM UsersDecks WHERE UserId={userId})").ToList();
                List<DeckDTO> decksToSend = new List<DeckDTO>();
                List<User> users = dbContext.Users.ToList();

                foreach (Deck deck in decks)
                {
                    User user = users.First(user => user.Id == deck.AuthorUserId);
                    decksToSend.Add(new DeckDTO()
                    {
                        Id = deck.Id,
                        Title = deck.Title,
                        Description = deck.Description,
                        Visibility = deck.Visibility,
                        AuthorUserId = deck.AuthorUserId,
                        AuthorUser = user.Username
                    });
                }

                return StatusCode(StatusCodes.Status200OK, decksToSend);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Fuck yourself and your fucking DecksToSend, cyka!");
            }
        }
        

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    int userId;
                    string claimName = identity.Name;
                    bool succeded = int.TryParse(claimName, out userId);

                    if (!succeded)
                    {
                        throw new ArgumentException("Could not retrieve ClaimName.");
                    }

                    User openingUser = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (openingUser != null)
                    {
                        UsersDeck usersOpeningDeck =
                            dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == id && ud.User.Id == userId);
                        if (usersOpeningDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                return StatusCode(StatusCodes.Status200OK, dbContext.Decks.First(item => item.Id == id));
            }


            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }

            catch (WebException we)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to get someones deck which does not belong to current user!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    int userId;
                    string claimName = identity.Name;
                    bool succeded = int.TryParse(claimName, out userId);

                    if (!succeded)
                    {
                        throw new ArgumentException("Could not retrieve ClaimName.");
                    }

                    User deletingUser = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (deletingUser != null)
                    {
                        UsersDeck usersDeletingDeck =
                            dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == id && ud.User.Id == userId);
                        if (usersDeletingDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                Deck findDeck = dbContext.Decks.First(item => item.Id == id);

                dbContext.Decks.Remove(findDeck);

                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, id);
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }
            catch (WebException we)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to delete deck which does not belong to you!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Deck deck)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    int userId;
                    string claimName = identity.Name;
                    bool succeded = int.TryParse(claimName, out userId);

                    if (!succeded)
                    {
                        throw new ArgumentException("Could not retrieve ClaimName.");
                    }

                    User openingUser = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (openingUser == null)
                    {
                        throw new WebException();
                    }

                    deck.AuthorUserId = userId;
                }
                
                dbContext.Decks.Add(deck);

                dbContext.SaveChanges();

                dbContext.UsersDecks.Add(new UsersDeck()
                {
                    UserId = deck.AuthorUserId,
                    DeckId = deck.Id
                });


                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, deck);
            }

            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }

            catch (WebException we)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to put deck where you are not an author!");
            }

            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Deck deck)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    int userId;
                    string claimName = identity.Name;
                    bool succeded = int.TryParse(claimName, out userId);

                    if (!succeded)
                    {
                        throw new ArgumentException("Could not retrieve ClaimName.");
                    }

                    User editingUser = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (editingUser != null)
                    {
                        UsersDeck usersOpeningDeck =
                            dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == id && ud.User.Id == userId);
                        if (usersOpeningDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                Deck findDeck = dbContext.Decks.First(item => item.Id == id);

                findDeck.Title = deck.Title;
                findDeck.Description = deck.Description;
                findDeck.Visibility = deck.Visibility;

                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, findDeck);
            }

            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }

            catch (WebException we)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to edit deck that don't belong to you!");
            }

            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
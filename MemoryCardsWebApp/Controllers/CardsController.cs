using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.TsEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : Controller
    {
        public class CardDTO
        {
            public Card Card { get; set; }
            public int DeckId { get; set; }
        }

        private MemoryCardsContext _dbContext;

        public CardsController(MemoryCardsContext context)
        {
            _dbContext = context;
        }


        [Authorize]
        [HttpGet("GetCardsByDeckId/{id}")]
        public IActionResult GetCardsByDeckId(int id)
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

                    User openingUser = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (openingUser != null)
                    {
                        UsersDeck usersOpeningDeck =
                            _dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == id && ud.User.Id == userId);
                        if (usersOpeningDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                List<Card> cards =
                    _dbContext.Cards.FromSqlRaw(
                            $"SELECT * FROM dbo.Cards WHERE id IN (SELECT CardId FROM dbo.DecksCards WHERE DeckId={id.ToString()})")
                        .ToList();

                return StatusCode(StatusCodes.Status200OK, cards);
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }
            catch (WebException e)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to get someones deck which does not belong to current user!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Fuck yourself and your fucking dumb head, cyka!");
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] CardDTO cardDto)
        {
            Card card = null;
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

                    User openingUser = _dbContext.Users.First(u => u.Id == userId);
                    if (openingUser == null)
                    {
                        throw new WebException();
                    }


                    int deckId = cardDto.DeckId;

                    UsersDeck usersOpeningDeck =
                        _dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == deckId && ud.User.Id == userId);
                    if (usersOpeningDeck == null)
                    {
                        throw new WebException();
                    }

                    card = cardDto.Card;
                    _dbContext.Cards.Add(card);

                    _dbContext.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, card);
                }
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }
            catch (WebException e)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to get someones deck which does not belong to current user!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Reached the end.");
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CardDTO cardDto)
        {
            Card card = null;
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

                    User openingUser = _dbContext.Users.First(u => u.Id == userId);
                    if (openingUser == null)
                    {
                        throw new WebException();
                    }


                    int deckId = cardDto.DeckId;

                    UsersDeck usersOpeningDeck =
                        _dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == deckId && ud.User.Id == userId);
                    if (usersOpeningDeck == null)
                    {
                        throw new WebException();
                    }

                    card = cardDto.Card;
                    Card findCard = _dbContext.Cards.First(item => item.Id == id);

                    findCard.FrontText = card.FrontText;
                    findCard.FrontImage = card.FrontImage;
                    findCard.BackText = card.BackText;
                    findCard.BackImage = card.BackImage;
                    findCard.Color = card.Color;

                    _dbContext.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, card);
                }
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }
            catch (WebException e)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to get someones deck which does not belong to current user!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Reached the end.");
        }

        [Authorize]
        [HttpGet("GetAllowance/{deckId}")]
        public IActionResult Get(int deckId)
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

                    User openingUser = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
                    if (openingUser != null)
                    {
                        UsersDeck userOpeningDeck =
                            _dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == deckId && ud.User.Id == userId);
                        if (userOpeningDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                return StatusCode(StatusCodes.Status200OK);
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Couldn't parse user id!");
            }
            catch (WebException e)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    "Trying to get someones deck which does not belong to current user!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Fuck yourself and your fucking dumb head, cyka!");
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                
                    Card foundCard = _dbContext.Cards.First(item => item.Id == id);

                    _dbContext.Cards.Remove(foundCard);

                    _dbContext.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, foundCard);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
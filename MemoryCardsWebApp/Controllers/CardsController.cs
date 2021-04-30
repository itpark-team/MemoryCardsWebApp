using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.DtoEntities;
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
        private MemoryCardsContext dbContext;

        public CardsController(MemoryCardsContext context)
        {
            dbContext = context;
        }


        [Authorize]
        [HttpGet("GetCardsByDeckId/{id}")]
        public IActionResult GetCardsByDeckId(int id)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

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
    
                List<Card> cards =
                    dbContext.Cards.FromSqlRaw(
                            $"SELECT * FROM dbo.Cards WHERE id IN (SELECT CardId FROM dbo.DecksCards WHERE DeckId={id})")
                        .ToList();

                return StatusCode(StatusCodes.Status200OK, cards);
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status409Conflict, $"Couldn't parse user id! {e.Message}");
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

                int userId;
                string claimName = identity.Name;
                bool succeded = int.TryParse(claimName, out userId);

                if (!succeded)
                {
                    throw new ArgumentException("Could not retrieve ClaimName.");
                }

                User openingUser = dbContext.Users.First(u => u.Id == userId);
                if (openingUser == null)
                {
                    throw new WebException();
                }


                int deckId = cardDto.DeckId;

                UsersDeck usersOpeningDeck =
                    dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == deckId && ud.User.Id == userId);
                if (usersOpeningDeck == null)
                {
                    throw new WebException();
                }

                card = cardDto.Card;
                dbContext.Cards.Add(card);

                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, card);
            
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
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CardDTO cardDto)
        {
            Card card = null;
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

                int userId;
                string claimName = identity.Name;
                bool succeded = int.TryParse(claimName, out userId);

                if (!succeded)
                {
                    throw new ArgumentException("Could not retrieve ClaimName.");
                }

                User openingUser = dbContext.Users.First(u => u.Id == userId);
                if (openingUser == null)
                {
                    throw new WebException();
                }
                
                int deckId = cardDto.DeckId;

                UsersDeck usersOpeningDeck =
                    dbContext.UsersDecks.FirstOrDefault(ud => ud.Deck.Id == deckId && ud.User.Id == userId);
                if (usersOpeningDeck == null)
                {
                    throw new WebException();
                }

                card = cardDto.Card;
                Card findCard = dbContext.Cards.First(item => item.Id == id);

                findCard.FrontText = card.FrontText;
                findCard.FrontImage = card.FrontImage;
                findCard.BackText = card.BackText;
                findCard.BackImage = card.BackImage;
                findCard.Color = card.Color;

                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, card);

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

        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Card foundCard = dbContext.Cards.First(item => item.Id == id);

                    dbContext.Cards.Remove(foundCard);

                    dbContext.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, foundCard);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
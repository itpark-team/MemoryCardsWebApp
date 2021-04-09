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
                var identity = HttpContext.User.Identity as ClaimsIdentity;

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
                    if (openingUser != null)
                    {
                        var usersOpeningDeck =
                            _dbContext.UsersDecks.First(ud => ud.Deck.Id == id && ud.User.Id == userId);
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


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _dbContext.Cards);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Card card)
        {
            try
            {
                _dbContext.Cards.Add(card);

                _dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, card);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Card card)
        {
            try
            {
                Card findCard = _dbContext.Cards.First(item => item.Id == id);

                findCard.FrontText = card.FrontText;
                findCard.FrontImage = card.FrontImage;
                findCard.BackText = card.BackText;
                findCard.BackImage = card.BackImage;
                findCard.Color = card.Color;


                _dbContext.SaveChanges();
             


                return StatusCode(StatusCodes.Status200OK, findCard);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Card findCard = _dbContext.Cards.First(item => item.Id == id);

                _dbContext.Cards.Remove(findCard);

                _dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
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
        private MemoryCardsContext db;

        public CardsController(MemoryCardsContext context)
        {
            db = context;
        }


        [Authorize]
        [HttpGet("GetCardsByDeckId/{id}")]
        public IActionResult GetCardsByDeckId([FromBody]string jwtTokenStr,[FromQuery] int id)
        {
            try
            {
                var token = new JwtSecurityTokenHandler().ReadJwtToken(jwtTokenStr);

                
                var claim = token.Claims.First(c => c.Type == "name").Value;
                
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    int userId;
                    string claimName = identity.FindFirst("ClaimName").Value;
                    bool succeded = int.TryParse(claimName, out userId);

                    if (!succeded)
                    {
                        throw new Exception("Could not retrieve ClaimName.");
                    }
                    
                    User openingUser = db.Users.First(u => u.Id == userId);
                    if (openingUser != null)
                    {
                        var usersOpeningDeck = db.UsersDecks.First(ud => ud.Deck.Id == id && ud.User.Id == userId);
                        if (usersOpeningDeck == null)
                        {
                            throw new WebException();
                        }
                    }
                }

                List<Card> cards =
                    db.Cards.FromSqlRaw(
                            $"SELECT * FROM dbo.Cards WHERE id IN (SELECT CardId FROM dbo.DecksCards WHERE DeckId={id.ToString()})")
                        .ToList();

                return StatusCode(StatusCodes.Status200OK, cards);
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
                return StatusCode(StatusCodes.Status200OK, db.Cards);
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
                db.Cards.Add(card);

                db.SaveChanges();

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
                Card findCard = db.Cards.First(item => item.Id == id);

                findCard.FrontText = card.FrontText;
                findCard.FrontImage = card.FrontImage;
                findCard.BackText = card.BackText;
                findCard.BackImage = card.BackImage;
                findCard.Color = card.Color;

                db.SaveChanges();

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
                Card findCard = db.Cards.First(item => item.Id == id);

                db.Cards.Remove(findCard);

                db.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
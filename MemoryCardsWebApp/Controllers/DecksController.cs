using System;
using System.Collections.Generic;
using System.Linq;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.TsEntities;
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
        private MemoryCardsContext _dbContext;

        public DecksController(MemoryCardsContext context)
        {
            _dbContext = context;
        }


        [Authorize]
        [HttpGet("GetDecksByUserId/{id}")]
        public IActionResult GetDecksByUserId(int id)
        {
            try
            {
                List<Deck> decks =
                    _dbContext.Decks.FromSqlRaw(
                        $"SELECT * FROM Decks WHERE id IN (SELECT DeckId FROM UsersDecks WHERE UserId={id})").ToList();
                List<DeckToSend> decksToSend = new List<DeckToSend>();
                List<User> users = _dbContext.Users.ToList();

                foreach (Deck deck in decks)
                {
                    User user = users.First(user => user.Id == deck.AuthorUserId);
                    decksToSend.Add(new DeckToSend()
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
                return StatusCode(StatusCodes.Status200OK, _dbContext.Decks.First(item => item.Id == id));
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
                Deck findDeck = _dbContext.Decks.First(item => item.Id == id);

                _dbContext.Decks.Remove(findDeck);

                _dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, id);
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
                _dbContext.Decks.Add(deck);

                _dbContext.SaveChanges();

                _dbContext.UsersDecks.Add(new UsersDeck()
                {
                    UserId = deck.AuthorUserId,
                    DeckId = deck.Id
                });


                _dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, deck);
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
                Deck findDeck = _dbContext.Decks.First(item => item.Id == id);

                findDeck.Title = deck.Title;
                findDeck.Description = deck.Description;
                findDeck.Visibility = deck.Visibility;

                _dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, findDeck);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
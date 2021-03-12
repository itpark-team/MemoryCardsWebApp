using System;
using System.Linq;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DecksController : ControllerBase
    {
        private readonly MemoryCardsContext db;

        public DecksController(MemoryCardsContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, db.Decks);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            { 
                return StatusCode(StatusCodes.Status200OK, db.Decks.First(item=>item.Id == id));
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
                Deck findDeck = db.Decks.First(item => item.Id == id);

                db.Decks.Remove(findDeck);

                db.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Deck deck)
        {
            try
            {
                db.Decks.Add(deck);

                db.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, deck);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Deck deck)
        {
            try
            {
                Deck findDeck = db.Decks.First(item => item.Id == id);

                findDeck.Title = deck.Title;
                findDeck.Description = deck.Description;
                findDeck.Visibility = deck.Visibility;

                db.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, findDeck);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
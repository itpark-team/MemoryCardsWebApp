using System;
using System.Linq;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
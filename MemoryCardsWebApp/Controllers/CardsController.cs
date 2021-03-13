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
    public class CardsController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                MemoryCardsContext db = new MemoryCardsContext();

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
                MemoryCardsContext db = new MemoryCardsContext();

                db.Cards.Add(card);

                db.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, card);
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
                MemoryCardsContext db = new MemoryCardsContext();

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
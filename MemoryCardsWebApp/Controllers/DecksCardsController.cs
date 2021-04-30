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
    public class DecksCardsController : Controller
    {
        private MemoryCardsContext dbContext;

        public DecksCardsController(MemoryCardsContext context)
        {
            dbContext = context;
        }
        
        [HttpPost]
        public IActionResult Post([FromBody] DecksCard decksCard)
        {
            try
            {
                dbContext.DecksCards.Add(decksCard);

                dbContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, decksCard);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
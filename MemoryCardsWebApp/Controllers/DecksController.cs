using System;
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
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                MemoryCardsContext db = new MemoryCardsContext();

                return StatusCode(StatusCodes.Status200OK, db.Decks);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
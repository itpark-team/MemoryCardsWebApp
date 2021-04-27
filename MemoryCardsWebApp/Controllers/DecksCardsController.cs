﻿using System;
using System.Linq;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [Route("api/[controller]/[action]/{id}")]
    public class DecksCardsController : Controller
    {
        private MemoryCardsContext dbContext;

        public DecksCardsController(MemoryCardsContext context)
        {
            dbContext = context;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, dbContext.DecksCards);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
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

        public IActionResult DeckCardsCount(int id)
        {
            try
            {
                int count = dbContext.DecksCards.Count(i => i.DeckId == id);

                return StatusCode(StatusCodes.Status200OK, count);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
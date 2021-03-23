using System;
using System.Collections.Generic;
using System.Linq;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MemoryCardsWebApp.Controllers
{
    
    
    
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private MemoryCardsContext db;

        public UsersController(MemoryCardsContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, db.Users);
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
                return StatusCode(StatusCodes.Status200OK, db.Users.First(item => item.Id == id));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }

        public class UserAuthenticationData
        {
            public string Login { get; set; }
            public string  PasswordHash { get; set; }
        }//я считаю нужен класс на незареганного юзера
        //пока кинул здесь, хз как лучше сделать(понятное дело так оставлять - хуйня)
        
        [HttpPost]
        public IActionResult Get([FromBody]  UserAuthenticationData userAuthenticationData)
        {
            Console.WriteLine(userAuthenticationData);
            try
            {
                return StatusCode(StatusCodes.Status200OK,
                    db.Users.First(item => item.Username == userAuthenticationData.Login && item.PasswordHash == userAuthenticationData.PasswordHash ));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
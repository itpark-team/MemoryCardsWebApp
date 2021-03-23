using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.ExtEntities;
using MemoryCardsWebApp.Models.TsEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private MemoryCardsContext db;
        private IOptions<AuthOptions> authOptions;

        public UsersController(MemoryCardsContext context, IOptions<AuthOptions> authOptions)
        {
            db = context;
            this.authOptions = authOptions;
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
 
        [HttpPost]
        public ActionResult Post([FromBody] UserAuthenticationData userAuthenticationData)
        {
            ClaimsIdentity identity = GetIdentity(userAuthenticationData);

            if (identity == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Invalid username or password.");
            }

            DateTime now = DateTime.UtcNow;

            AuthOptions authParams = authOptions.Value;
            
            JwtSecurityToken jwt = new JwtSecurityToken(
                issuer: authParams.Issuer,
                audience: authParams.Audience,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromSeconds(authParams.TokenLifeTime)),
                signingCredentials: new SigningCredentials(authParams.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt
            };

            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(UserAuthenticationData userAuthenticationData)
        {
            User findUser = db.Users.FirstOrDefault(item => item.Email == userAuthenticationData.Email && item.PasswordHash == userAuthenticationData.PasswordHash);

            if (findUser != null)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, findUser.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "user")
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }
    }
}
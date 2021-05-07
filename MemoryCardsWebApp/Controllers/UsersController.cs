using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.DtoEntities;
using MemoryCardsWebApp.Models.ExtEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MemoryCardsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private MemoryCardsContext dbContext;
        private IOptions<AuthOptions> authOptions;

        public UsersController(MemoryCardsContext context, IOptions<AuthOptions> authOptions)
        {
            dbContext = context;
            this.authOptions = authOptions;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                
                int userId;
                string claimName = identity.Name;
                bool succeded = int.TryParse(claimName, out userId);

                User user = dbContext.Users.First(item => item.Id == userId);
                
                return StatusCode(StatusCodes.Status200OK, user);
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR message: " + e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] UserAuthDTO userAuthDto)
        {
            try
            {
                ClaimsIdentity identity = GetIdentity(userAuthDto);

                if (identity == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid username or password.");
                }

                DateTime now = DateTime.UtcNow;

                AuthOptions authParams = authOptions.Value;

                JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: authParams.Issuer,
                    audience: authParams.Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromSeconds(authParams.TokenLifeTime)),
                    signingCredentials: new SigningCredentials(authParams.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256));

                string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    id_user = identity.Name
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
        private ClaimsIdentity GetIdentity(UserAuthDTO userAuthDto)
        {
            User foundUser = dbContext.Users.FirstOrDefault(u =>
                u.Email == userAuthDto.Email && u.PasswordHash == userAuthDto.PasswordHash);

            if (foundUser != null)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, foundUser.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "user")
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            //not found user
            return null;
        }
    }
}
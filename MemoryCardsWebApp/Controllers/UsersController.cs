using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using MemoryCardsWebApp.Models.ExtEntities;
using MemoryCardsWebApp.Models.TsEntities;
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
        private MemoryCardsContext _dbContext;
        private IOptions<AuthOptions> _authOptions;

        public UsersController(MemoryCardsContext context, IOptions<AuthOptions> authOptions)
        {
            _dbContext = context;
            _authOptions = authOptions;
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _dbContext.Users.First(item => item.Id == id));
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR message: " + e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost("Login")]
        public ActionResult Post([FromBody] UserAuthenticationData userAuthenticationData)
        {
            try
            {
                ClaimsIdentity identity = GetIdentity(userAuthenticationData);

                if (identity == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid username or password.");
                }

                DateTime now = DateTime.UtcNow;

                AuthOptions authParams = _authOptions.Value;

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

        private ClaimsIdentity GetIdentity(UserAuthenticationData userAuthenticationData)
        {
            User foundUser = _dbContext.Users.FirstOrDefault(u =>
                u.Email == userAuthenticationData.Email && u.PasswordHash == userAuthenticationData.PasswordHash);

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
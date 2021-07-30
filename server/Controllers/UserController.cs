using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DataAccess;
using server.Models.Database;
using server.Models.Request;
using server.Utils;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly PrimeContext Db;

        public UserController(PrimeContext db)
        {
            Db = db;
        }

        private async Task<bool> UserExists(UserLogin user)
        {
            var hashedPassword = await HashUtils.HashPasswordAsync(user.Password);
            if (user.Email != null)
            {
                if(await Db.Users.AnyAsync(dbUser => dbUser.Email == user.Email && dbUser.HashedPassword == hashedPassword))
                {
                    return true;
                }
            }
            else
            {
                if(await Db.Users.AnyAsync(dbUser => dbUser.Username == user.Username && dbUser.HashedPassword == hashedPassword))
                {
                    return true;
                }
            }
            return false;
        }
        
        [HttpPost]
        public async Task<IActionResult> Register(UserRegister input)
        {
            //make sure username is unique
            if (await Db.Users.AnyAsync(user => user.Username == input.Username))
            {
                return Problem(title: "Unique Username Constraint Failed",
                    detail: "A user with that name exists. Please pick another name", statusCode:400);
            }
            
            //construct database object
            var dbUser = new DatabaseUser();
            dbUser.Email = input.Email;
            dbUser.Username = input.Username;
            dbUser.HashedPassword = await HashUtils.HashPasswordAsync(input.Password);
            
            //add the user to the database and commit the changes
            await Db.Users.AddAsync(dbUser);
            try
            {
                await Db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Problem(title:"DB Update Error", detail:"Internal database failure. If this error keeps occuring please email me.");
            }

            var claims = new List<Claim>
                {
                    new Claim("user", input.Username),
                    new Claim("role", "Member")
                };

            await HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(claims, "Cookies", "user", "role")));

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserLogin input)
        {
            if(await UserExists(input))
            {
                var claims = new List<Claim>
                {
                    new Claim("user", input.Username),
                    new Claim("role", "Member")
                };

                await HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(claims, "Cookies", "user", "role")));

                return Ok();
            }
            return Unauthorized();

        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        public IActionResult Me()
        {
            if (string.IsNullOrWhiteSpace(HttpContext.User.Identity.Name))
            {
                return Ok($"You are not signed in.");

            }
            return Ok($"You are {HttpContext.User.Identity.Name}.");
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAccount()
        {
            //delete the account of the signed in person
            if (string.IsNullOrWhiteSpace(HttpContext.User.Identity.Name))
            {
                return Unauthorized($"You are not signed in.");
            }

            var username = HttpContext.User.Identity.Name;
            Db.Users.Remove(await Db.Users.FirstAsync(user=>user.Username==username));
            try
            {
                await Db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Problem(title: "DB Update Error", detail: "Internal database failure. If this error keeps occuring please email me.");
            }

            await HttpContext.SignOutAsync();

            return Ok();
        }
    }
}
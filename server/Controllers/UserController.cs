using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
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
        
        [HttpPost]
        public async Task<IActionResult> Register(UserRegister input)
        {
            //make sure username is unique
            if (await Db.Users.AnyAsync(user => user.Username == input.Username))
            {
                return Problem(title: "Unique Username Constraint Failed",
                    detail: "A user with that name exists. Please pick another name", statusCode: 400);
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
            var hashedPassword = await HashUtils.HashPasswordAsync(input.Password);
            DatabaseUser? user = null;
            if (input.UsernameOrEmail.Contains('@'))
            {
                //username or email is an email
                user = await Db.Users.FirstOrDefaultAsync(user => user.Email == input.UsernameOrEmail && user.HashedPassword == hashedPassword);
            }
            else
            {
                //username or email is a username
                user = await Db.Users.FirstOrDefaultAsync(user => user.Username == input.UsernameOrEmail && user.HashedPassword == hashedPassword);
            }
            if (user is null)
            {
                return Unauthorized();
            }

            var claims = new List<Claim>
                {
                    new Claim("user", user.Username),
                    new Claim("role", "Member")
                };

            await HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(claims, "Cookies", "user", "role")));

            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        [Authorize]
        public IActionResult Me()
        {
            return Ok(new {username=HttpContext.User.Identity?.Name});
        }
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount()
        {
            var username = HttpContext.User.Identity?.Name;
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
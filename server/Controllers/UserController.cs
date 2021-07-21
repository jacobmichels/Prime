using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DataAccess;
using server.Models;
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
        public async Task<IActionResult> Register(RegisterInput input)
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
            dbUser.HashedPassword = await HashUtils.HashPassword(input.Password);
            
            //add the user to the database and commit the changes
            Db.Users.Add(dbUser);
            try
            {
                await Db.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return Problem(title:"DB Update Error", detail:"Internal database failure. If this error keeps occuring please email me.");
            }
            
            //set cookie to login the user

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Login(RegisterInput input)
        {
            DatabaseUser userToLogin;
            if (!string.IsNullOrWhiteSpace(input.Email))
            {
                userToLogin = await Db.Users.FirstAsync(user => user.Email == input.Email);
            }
            else if (!string.IsNullOrWhiteSpace(input.Username))
            {
                userToLogin = await Db.Users.FirstAsync(user => user.Username == input.Username);
            }
            else
            {
                return Problem(title: "Form Invalid", detail: "Either Username or Email needs to be supplied.", statusCode:400);
            }

            if (userToLogin is null)
            {
                return Problem(title: "No User Found", detail: "No user with those credentials exists.", statusCode:400);
            }
            
            //login the user with a cookie
            var userSessionId = Guid.NewGuid();
            Response.Headers.Add($"Set-Cookie", $"prime_cookie={userSessionId.ToString()}");

            return Ok();
        }
        
        [HttpGet]
        public async Task<IActionResult> ListUsers()
        {
            return Ok(await Db.Users.ToListAsync());
        }
        
        [HttpGet]
        public async Task<IActionResult> SetCookie()
        {
            Response.Headers.Add("Set-Cookie", "prime_cookie=value");
            return Ok();
        }
        
        [HttpGet]
        public async Task<IActionResult> VerifyPassword(string username, string password)
        {
            var user = await Db.Users.Where(user => user.Username == username).FirstAsync();
            return Ok(await HashUtils.VerifyPassword(password, user.HashedPassword));
        }
    }
}
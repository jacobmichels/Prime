using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DataAccess;
using server.Migrations;
using server.Models.Database;
using server.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class GameController : ControllerBase
    {
        private readonly PrimeContext Db;
        public GameController(PrimeContext db)
        {
            Db = db;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateGame(string gameName, bool isPrivate)
        {
            if (await GameWithNameExists(gameName))
            {
                return Problem(title:"Game name in use.", detail: $"A game with the name \"{gameName}\" already exists. Please choose another name.", statusCode:400);
            }
            var user = await Db.Users.FirstOrDefaultAsync(user => user.Username == HttpContext.User.Identity.Name);
            if(user is null)
            {
                return Unauthorized();
            }
            var newGame = new DatabaseGame(gameName, isPrivate, user);
            Db.Games.Add(newGame);

            return Ok(newGame);
        }

        [HttpPost]
        [Authorize]

        private async Task<bool> GameWithNameExists(string gameName)
        {
            var game = await Db.Games.FirstOrDefaultAsync(e => e.Name == gameName);
            return game != null;
        }
        
    }
}

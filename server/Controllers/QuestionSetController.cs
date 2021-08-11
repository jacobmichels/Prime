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
    public class QuestionSetController : ControllerBase
    {
        private readonly PrimeContext Db;

        public QuestionSetController(PrimeContext db)
        {
            Db = db;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(QuestionSetInput input)
        {
            if (string.IsNullOrWhiteSpace(HttpContext.User.Identity?.Name))
            {
                return Unauthorized();
            }
            DatabaseQuestionSet questionSet = new DatabaseQuestionSet(input.Title, input.Private, HttpContext.User.Identity.Name);

            foreach(var question in input.Questions)
            {
                var questionToAdd = new DatabaseQuestion(question.Title, question.QuestionText, question.GivenAnswer, question.ShowAnswerTextField);
                questionSet.Questions.Add(questionToAdd);
            }

            await Db.QuestionSets.AddAsync(questionSet);

            await Db.SaveChangesAsync();

            return Ok();
        }

        //Return all public questionsets.
        [HttpGet]
        public async Task<IActionResult> GetAllPublic()
        {
            var publicQuestionSets = await Db.QuestionSets.Where(questionSet => questionSet.Private == false).ToListAsync();

            return Ok(publicQuestionSets);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            //if questionset is private, make sure the current user owns it.
            var questionset = await Db.QuestionSets.FirstAsync(questionset => questionset.Id == id);
            if (questionset.Private && questionset.OwnerName!=HttpContext.User.Identity?.Name)
            {
                return Unauthorized();
            }

            return Ok(questionset);
        }

        [HttpGet]
        public async Task<IActionResult> GetByTitle(string title)
        {
            //if questionset is private, make sure the current user owns it.
            var questionset = await Db.QuestionSets.FirstAsync(questionset => questionset.Title == title);
            if (questionset.Private && questionset.OwnerName != HttpContext.User.Identity?.Name)
            {
                return Unauthorized();
            }

            return Ok(questionset);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMine()
        {
            //if questionset is private, make sure the current user owns it.
            var owner = HttpContext.User.Identity?.Name;
            if (string.IsNullOrWhiteSpace(owner))
            {
                return Unauthorized();
            }

            var questionsets = await Db.QuestionSets.Where(questionset => questionset.OwnerName == owner).ToListAsync();
            return Ok(questionsets);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            //make sure the current user is the owner of the question sets to be deleted
            var owner = HttpContext.User.Identity?.Name;
            if (string.IsNullOrWhiteSpace(owner))
            {
                return Unauthorized();
            }

            var questionSetToDelete = await Db.QuestionSets.Where(questionset=>questionset.OwnerName == owner && questionset.Id==id).Include(e=>e.Questions).FirstAsync();
            if (questionSetToDelete == null)
            {
                return Unauthorized();
            }
            Db.QuestionSets.Remove(questionSetToDelete);
            await Db.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> Update(int id, QuestionSetInput input)
        {
            var questionset = await Db.QuestionSets.Where(questionset => questionset.Id == id).Include(e=>e.Questions).FirstAsync();
            questionset.Private = input.Private;
            questionset.Title = input.Title;
            questionset.Questions.Clear();
            //foreach (var question in input.Questions)
            //{
            //    var questionToAdd = new DatabaseQuestion(question.Title, question.QuestionText, question.GivenAnswer, question.ShowAnswerTextField);
            //    questionset.Questions.Add(questionToAdd);
            //}
            await Db.SaveChangesAsync();
            return Ok();
        }
    }
}

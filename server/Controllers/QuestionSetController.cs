using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DataAccess;
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

        [HttpPost]
        public async Task<IActionResult> Create(QuestionSetInput input)
        {
            DatabaseQuestionSet questionSet = new DatabaseQuestionSet(input.Title, input.Private);

            foreach(var question in input.Questions)
            {
                var questionToAdd = new DatabaseQuestion(question.Title, question.QuestionText, question.GivenAnswer, question.ShowAnswerTextField);
                questionSet.Questions.Add(questionToAdd);
            }

            await Db.QuestionSets.AddAsync(questionSet);

            await Db.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(Db.QuestionSets.ToList());
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(Db.QuestionSets.First(questionset=>questionset.Id==id));
        }

    }
}

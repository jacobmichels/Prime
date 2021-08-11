using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Database
{
    public class DatabaseQuestion
    {
        public DatabaseQuestion(string title, string questionText, string answer, bool showTextField)
        {
            Title = title;
            Question=questionText;
            ShowAnswerTextField = showTextField;
            GivenAnswer = answer;
        }

        public DatabaseQuestion()
        {
        }

        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Question {  get; set; }
        [Required]
        public bool ShowAnswerTextField {  get; set; }
        [Required]
        public string GivenAnswer { get; set; }
        public int DatabaseQuestionSetId { get; set; }
    }
}

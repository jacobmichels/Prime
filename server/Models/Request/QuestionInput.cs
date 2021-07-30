using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Request
{
    public class QuestionInput
    {
        [Required]
        public string QuestionText { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public bool ShowAnswerTextField { get; set; }
        [Required]
        public string GivenAnswer { get; set; }
    }
}

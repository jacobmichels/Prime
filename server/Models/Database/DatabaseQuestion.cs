using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Database
{
    public class DatabaseQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        [Required]
        public string Question {  get; set; }
        [Required]
        public bool ShowAnswerTextField {  get; set; }
        [Required]
        public string GivenAnswer { get; set; }
    }
}

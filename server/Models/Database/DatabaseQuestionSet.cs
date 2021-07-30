using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Database
{
    public class DatabaseQuestionSet
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title {  get; set; }
        public bool Private { get; set; }
        public List<DatabaseQuestion> Questions { get; set; }
    }
}

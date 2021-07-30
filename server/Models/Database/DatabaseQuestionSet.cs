using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Database
{
    public class DatabaseQuestionSet
    {
        public DatabaseQuestionSet(string title, bool priv)
        {
            Title = title;
            Private = priv;
            Questions = new List<DatabaseQuestion>();
        }
        public DatabaseQuestionSet()
        {
        }


        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public bool Private { get; set; }
        [Required]
        public DatabaseUser Owner { get; set; }
        public List<DatabaseQuestion> Questions { get; set; }
    }
}

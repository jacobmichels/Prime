using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Database
{
    public class DatabaseQuestionSet
    {
        public DatabaseQuestionSet(string title, bool priv, string owner)
        {
            Title = title;
            Private = priv;
            Questions = new List<DatabaseQuestion>();
            OwnerName = owner;
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
        public string OwnerName { get; set; }
        public virtual List<DatabaseQuestion> Questions { get; set; }
    }
}

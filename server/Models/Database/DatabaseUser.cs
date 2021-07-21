using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace server.Models
{
    public class DatabaseUser
    {
        [Key]
        public int Id { get; set; }
        
        [MinLength(3)]
        public string Username { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        
        public string HashedPassword { get; set; }
    }
}
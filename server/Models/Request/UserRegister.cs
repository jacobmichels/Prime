using System.ComponentModel.DataAnnotations;
using server.Validation;

namespace server.Models.Request
{
    public class UserRegister
    {
        [Required]
        [MinLength(3)]
        [NoAtSign]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
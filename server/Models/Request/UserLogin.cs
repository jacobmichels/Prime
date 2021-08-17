using System.ComponentModel.DataAnnotations;
using server.Validation;

namespace server.Models.Request
{
    public class UserLogin
    {
        [Required]
        [MinLength(3)]
        public string UsernameOrEmail { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
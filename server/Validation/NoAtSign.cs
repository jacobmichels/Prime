using System.ComponentModel.DataAnnotations;

namespace server.Validation
{
    public class NoAtSign : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var username = (string) value;
            return !username.Contains('@');
        }  
    }
}
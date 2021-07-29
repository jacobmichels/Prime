using System.Text;
using System.Threading.Tasks;
using Konscious.Security.Cryptography;

namespace server.Utils
{
    public class HashUtils
    {
        public async static Task<string> HashPasswordAsync(string password)
        {
            var argon2 = new Argon2d(Encoding.UTF8.GetBytes(password));
            argon2.DegreeOfParallelism = 32;
            argon2.MemorySize = 16392;
            argon2.Iterations = 48;
            argon2.Salt = Encoding.UTF8.GetBytes("479ee68d-edb4-43dd-ad14-c5350ba30b2c");

            return Encoding.ASCII.GetString(await argon2.GetBytesAsync(30));
        }

        //Verifies that the input password matches the stored hashed password
        public async static Task<bool> VerifyPasswordAsync(string inputPassword, string storedHash)
        {
            var argon2 = new Argon2d(Encoding.UTF8.GetBytes(inputPassword));
            argon2.DegreeOfParallelism = 32;
            argon2.MemorySize = 16392;
            argon2.Iterations = 48;
            argon2.Salt = Encoding.UTF8.GetBytes("479ee68d-edb4-43dd-ad14-c5350ba30b2c");

            var inputHash = Encoding.ASCII.GetString(await argon2.GetBytesAsync(30));

            return inputHash == storedHash;
        }
    }
}
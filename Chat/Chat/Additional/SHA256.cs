using System.Text;
using System.Security.Cryptography;

namespace Chat.Additional
{
    public static class SHA256
    {
        public static string ToSHA256(string data)
        {
            var crypt = new SHA256Managed();
            var hash = new StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(data));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }
    }
}

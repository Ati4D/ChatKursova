using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Chat.Models
{
    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(PhoneNumber), IsUnique = true)]
    public class User
    {
        public int Id { get; set; }
        [MinLength(3)]
        [Required]
        public string FirstName { get; set; }
        [MinLength(3)]
        [Required]
        public string LastName { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Phone]
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }

        public List<UsersChats> UsersChats { get; set; }
    }
}
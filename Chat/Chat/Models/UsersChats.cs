using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class UsersChats
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ChatId { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        [Required]
        public bool IsBunned { get; set; }

        public User User { get; set; }
        public Chat Chat { get; set; }
    }
}
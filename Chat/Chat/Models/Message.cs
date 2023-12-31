using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required] 
        public int ChatId { get; set; }
        [Required]
        public string text { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }

        public Chat Chat { get; set; }
        public User User { get; set; }
    }
}
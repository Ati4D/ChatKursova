using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string text { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }

        public List<ChatsMessages> ChatsMessages { get; set; }
        public User User { get; set; }
    }
}
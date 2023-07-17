using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class ChatsMessages
    {
        public int Id { get; set; }
        [Required]
        public int ChatId { get; set; }
        [Required]
        public int MessageId { get; set; }

        public Chat Chat { get; set; }
        public Message Message { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class Chat
    {
       public int Id { get; set; }
        [Required]
       public int CreatorUserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public string Description { get; set; }
        public string Avatar { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }

        public List<UsersChats> UsersChats { get; set; }
        public List<ChatsMessages> ChatsMessages { get; set; }
    }
}
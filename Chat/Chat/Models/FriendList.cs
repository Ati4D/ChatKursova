using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class FriendList
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int FriendId { get; set; }
        [Required]
        public int Type { get; set; } 


        public User User { get; set; }
    }
}
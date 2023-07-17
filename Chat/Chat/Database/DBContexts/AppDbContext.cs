using Microsoft.EntityFrameworkCore;
using Chat.Models;

namespace Chat.Database.DbContexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UsersChats> UsersChats { get; set; }
        public DbSet<Models.Chat> Chats{ get; set; }
        public DbSet<ChatsMessages> ChatsMessages { get; set; }
        public DbSet<Message> Messages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
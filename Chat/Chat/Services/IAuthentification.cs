using Chat.Models;

namespace Chat.Services
{
    public interface IAuthentification
    {
        bool CheckUser();
        User GetUser();
        void SetUser(User user);
        void LogOut();
    }
}

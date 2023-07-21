using Chat.Models;

namespace Chat.Services
{
    public class Authentification : IAuthentification
    {
        private User? _user;

        public bool CheckUser()
        {
            return _user != null;
        }

        public User GetUser()
        {
            return _user;
        }

        public void LogOut()
        {
            _user = null;
        }

        public void SetUser(User user)
        {
            _user = user;
        }
    }
}

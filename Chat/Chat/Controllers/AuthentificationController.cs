using Chat.Additional;
using Chat.Database.DbContexts;
using Chat.Models;
using Chat.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthentificationController : ControllerBase
    {
        private readonly IAuthentification _authentification;
        private readonly AppDbContext _context;
        public AuthentificationController(IAuthentification authentification, AppDbContext context)
        {
            _authentification = authentification;
            _context = context;
        }
        // GET: api/<AuthentificationController>
        [HttpGet]
        public IActionResult Get()
        {
            User? user = _authentification.GetUser();
            if (user != null)
                return Ok(user); 
            return NotFound();
        }
        [HttpGet("{text}")]
        public async Task<ActionResult<User>> GetUser(string text)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            string[] arr = text.Split('|');

            var user = await _context.Users.FirstOrDefaultAsync(x => x.FirstName+x.Email+x.Password == arr[0] + arr[1] + SHA256.ToSHA256(arr[2]));

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST api/<AuthentificationController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] string[] value)
        {
            if(value.Length == 3)
            {
                string check = value[0] + value[1]+ SHA256.ToSHA256(value[2]); 
                User? user = await _context.Users.FirstOrDefaultAsync(x => (x.FirstName + x.Email + x.Password) == check);
                if (user == null)
                    return BadRequest("No such user registrated!");
                _authentification.SetUser(user);
                return Ok();
            }
            else
            {
                User user = new User()
                {
                    FirstName = value[0],
                    LastName = value[1],
                    Password = SHA256.ToSHA256(value[2]),
                    PhoneNumber = value[3],
                    Email = value[4],
                    RegistrationDate = DateTime.UtcNow
                };

                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
                _authentification.SetUser( _context.Users.FirstOrDefault(x => x.Email == user.Email) ?? null);
                return Ok();
            }   
        }

        // PUT api/<AuthentificationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthentificationController>/5
        [HttpDelete()]
        public void Delete()
        {
            _authentification.LogOut();
            Console.WriteLine("LogOuted");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Chat.Database.DbContexts;
using Chat.Models;

namespace Chat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChatsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Chats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Chat>>> GetChats()
        {
          if (_context.Chats == null)
          {
              return NotFound();
          }
            return await _context.Chats.ToListAsync();
        }

        // GET: api/Chats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Chat>>> GetChats(int id)
        {
          if (_context.Chats == null)
          {
              return NotFound();
          }

            var chats = new List<Models.Chat>();
            try
            {
                chats = await _context.UsersChats.Where(x => x.UserId == id).Include(x => x.Chat).Select(x=>x.Chat).ToListAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            foreach (var chat in chats) { Console.WriteLine(chat.Name); }

            if (chats == null)
            {
                return NotFound();
            }

            return chats;
        }

        [HttpGet("users/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
        
            var users = new List<User>();
            try
            {
                users = await _context.UsersChats.Where(x => x.ChatId == id).Include(x => x.User).Select(x => x.User).ToListAsync();
        
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        
            foreach (var user in users) { Console.WriteLine(user.FirstName); }
        
            if (users == null)
            {
                return NotFound();
            }
        
            return users;
        }

        // PUT: api/Chats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChat(int id, Models.Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }

            _context.Entry(chat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Chats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Models.Chat>> PostChat(Models.Chat chat)
        {
          if (_context.Chats == null)
          {
              return Problem("Entity set 'AppDbContext.Chats'  is null.");
          }
            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChat", new { id = chat.Id }, chat);
        }

        // DELETE: api/Chats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            if (_context.Chats == null)
            {
                return NotFound();
            }
            var chat = await _context.Chats.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChatExists(int id)
        {
            return (_context.Chats?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

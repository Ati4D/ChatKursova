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
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessagesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessage(int id)
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            Console.WriteLine("Yep");
            var messages = await _context.Messages.Where(x => x.ChatId == id).ToListAsync();
            foreach (var message in messages) { Console.WriteLine(message.text); }


            if (messages == null)
            {
                return NotFound();
            }

            return messages;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       // [HttpPut("{id}")]
       // public async Task<IActionResult> PutMessage(int id, string message)
       // {
       //     if (id != message.Id)
       //     {
       //         return BadRequest();
       //     }
       //
       //     _context.Entry(message).State = EntityState.Modified;
       //
       //     try
       //     {
       //         await _context.SaveChangesAsync();
       //     }
       //     catch (DbUpdateConcurrencyException)
       //     {
       //         if (!MessageExists(id))
       //         {
       //             return NotFound();
       //         }
       //         else
       //         {
       //             throw;
       //         }
       //     }
       //
       //     return NoContent();
       // }

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(string[] message)
        {

            Console.WriteLine("I there");

            int userId = Convert.ToInt32(message[0]);
            int groupId = Convert.ToInt32(message[1]);
            string text = message[2];
            var newMessage = new Message() { UserId = userId, ChatId = groupId, text = text+" ", CreatedDate = DateTime.UtcNow };
            await _context.Messages.AddAsync(newMessage);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(int id)
        {
            return (_context.Messages?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Models;
using Microsoft.AspNetCore.Authorization;

namespace AuthService.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotesController(INotesRepository noteRepo, IUserRepository userRepo) : ControllerBase
{
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddNote([FromBody] Note note)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid token data");

        note.UserId = userId;
        note.CreatedAt = DateTime.UtcNow;

        await noteRepo.AddNoteAsync(note);
        return Ok();
    }

    [Authorize]
    [HttpGet("get")]
    public async Task<IActionResult> GetNotes()
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid token data");

        var notes = await noteRepo.GetNotesByUserIdAsync(userId);
        
        return Ok(notes);
    }

    [Authorize]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteNote(string id)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid token data");

        await noteRepo.DeleteNoteAsync(id, userId);

        return Ok();
    }
}
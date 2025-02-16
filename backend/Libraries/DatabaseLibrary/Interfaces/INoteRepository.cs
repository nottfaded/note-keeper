using DatabaseLibrary.Models;

namespace DatabaseLibrary.Interfaces;

public interface INoteRepository
{
    public Task AddNoteAsync(Note note);
    public Task<IEnumerable<Note>> GetNotesByUserIdAsync(string userId);
    public Task DeleteNoteAsync(string noteId, string userId);
}
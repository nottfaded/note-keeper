using DatabaseLibrary.Models;

namespace DatabaseLibrary.Interfaces;

public interface INotesRepository
{
    public Task AddNoteAsync(Note note);
    public Task<IEnumerable<Note>> GetNotesByUserIdAsync(string userId);
    public Task DeleteNoteAsync(string noteId, string userId);
}
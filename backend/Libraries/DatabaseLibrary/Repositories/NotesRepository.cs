using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Models;
using MongoDB.Driver;

namespace DatabaseLibrary.Repositories;

public class NotesRepository(MongoDbContext context) : INotesRepository
{
    private readonly IMongoCollection<Note> _notes = context.GetCollection<Note>("notes");

    public async Task AddNoteAsync(Note note)
    {
        await _notes.InsertOneAsync(note);
    }

    public async Task<IEnumerable<Note>> GetNotesByUserIdAsync(string userId)
    {
        return await _notes.Find(n => n.UserId == userId).ToListAsync();
    }

    public async Task DeleteNoteAsync(string noteId, string userId)
    {
        await _notes.DeleteOneAsync(n => n.Id == noteId && n.UserId == userId);
    }
}
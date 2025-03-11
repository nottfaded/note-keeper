using DatabaseLibrary;
using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Models;
using DatabaseLibrary.Repositories;
using Mongo2Go;
using MongoDB.Bson;
using MongoDB.Driver;

namespace NotesService.Test;

public class NotesRepositoryTests : IAsyncLifetime
{
    private readonly INotesRepository _notesRepository;
    private readonly MongoDbRunner _mongoRunner;
    private readonly MongoDbContext _testDbContext;

    public NotesRepositoryTests()
    {
        _mongoRunner = MongoDbRunner.Start();

        _testDbContext = new MongoDbContext(_mongoRunner.ConnectionString);
        _notesRepository = new NotesRepository(_testDbContext);
    }

    [Fact]
    public async Task AddNoteAsync_ShouldInsertNote()
    {
        var objectId = ObjectId.GenerateNewId().ToString();

        var note = new Note
        {
            Id = objectId, 
            UserId = ObjectId.GenerateNewId().ToString(),
            Content = "Test note"
        };

        await _notesRepository.AddNoteAsync(note);
        var collection = _testDbContext.GetCollection<Note>("notes");
        var insertedNote = await collection.Find(n => n.Id == note.Id).FirstOrDefaultAsync();

        Assert.NotNull(insertedNote);
        Assert.Equal(note.Content, insertedNote.Content);
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        _mongoRunner.Dispose();
        return Task.CompletedTask;
    }
}
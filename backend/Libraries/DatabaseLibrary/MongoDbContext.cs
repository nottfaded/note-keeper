using MongoDB.Driver;

namespace DatabaseLibrary;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string? testConnection = null)
    {
        var isRunningInContainer = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";
        var connection = testConnection ?? (isRunningInContainer ? "mongodb://host.docker.internal:27017" : "mongodb://localhost:27017");

        var client = new MongoClient(connection);
        _database = client.GetDatabase("NotesApp");
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
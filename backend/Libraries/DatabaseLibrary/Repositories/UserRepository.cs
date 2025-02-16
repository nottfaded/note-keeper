using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Models;
using MongoDB.Driver;

namespace DatabaseLibrary.Repositories;

public class UserRepository(MongoDbContext context) : IUserRepository
{
    private readonly IMongoCollection<User> _users = context.GetCollection<User>("users");

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
    }

    public async Task AddUserAsync(User user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }
}
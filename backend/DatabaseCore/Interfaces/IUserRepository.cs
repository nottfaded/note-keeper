using DatabaseCore.Models;

namespace DatabaseCore.Interfaces;

public interface IUserRepository
{
    Task<User?> GetUserByEmailAsync(string email);
    Task AddUserAsync(User user);
    Task<IEnumerable<User>> GetAllUsersAsync();
}
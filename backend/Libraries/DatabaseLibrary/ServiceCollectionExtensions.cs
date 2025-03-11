using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DatabaseLibrary;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabaseServices(this IServiceCollection services)
    {
        services.AddSingleton<MongoDbContext>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<INotesRepository, NotesRepository>();

        return services;
    }
}
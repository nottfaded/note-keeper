using DatabaseCore.Interfaces;
using DatabaseCore.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DatabaseCore;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabaseServices(this IServiceCollection services)
    {
        services.AddSingleton<MongoDbContext>();
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}
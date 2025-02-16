using DatabaseLibrary;
using JwtLibrary;

namespace NotesService;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddJwtAuthentication();
        builder.Services.AddDatabaseServices();

        builder.Services.AddControllers();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowOrigins", police =>
            {
                police.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseCors("AllowOrigins");

        if (app.Environment.IsProduction())
            app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
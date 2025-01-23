using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

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

            builder.Services.AddAuthentication(optional =>
                {
                    optional.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    optional.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddGoogle(googleOpt =>
                {
                    googleOpt.ClientId = builder.Configuration["Authentication:Google:ClientId"];
                    googleOpt.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
                    googleOpt.CallbackPath = "/signin-google";
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
}

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DatabaseCore.Interfaces;
using DatabaseCore.Models;
using Newtonsoft.Json;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IUserRepository userRepo) : ControllerBase
{
    [HttpGet("googleLogin")]
    public IActionResult GoogleLogin()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action("GoogleResponse", "auth")
        };

        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("google-response")]
    public async Task<IActionResult> GoogleResponse()
    {
        var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

        if (!result.Succeeded)
            return Unauthorized("Unsuccessful authorization");

        var claims = result.Principal.Identities.FirstOrDefault()?.Claims;
        var email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        if(email == null) 
            return Unauthorized("Can't find email");

        var user = await userRepo.GetUserByEmailAsync(email);

        if (user == null)
        {
            user = new User
            {
                Email = email,
            };
            await userRepo.AddUserAsync(user);
        }

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            result.Principal,
            result.Properties);

        return Redirect("http://localhost:5173");
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { message = "Logged out" });
    }
}

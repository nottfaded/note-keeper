using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DatabaseLibrary.Interfaces;
using DatabaseLibrary.Models;
using JwtLibrary;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IUserRepository userRepo) : ControllerBase
{
    [HttpGet("check")]
    public IActionResult Check()
    {
        if (!Request.Headers.TryGetValue("Authorization", out var authHeader) || string.IsNullOrEmpty(authHeader))
            return Unauthorized("Token is missing or invalid");

        var token = authHeader.ToString().Replace("Bearer ", "");
        
        try
        {
            var principal = JwtService.ValidateToken(token);

            if (principal == null)
                return Unauthorized("Invalid token");

            var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var avatar = principal.Claims.FirstOrDefault(c => c.Type == "account_avatar")?.Value;

            if (email == null)
                return Unauthorized("Can't extract email from token");

            return Ok(new { Email = email, Avatar = avatar });
        }
        catch (Exception ex)
        {
            return Unauthorized(ex.Message == "TokenExpired" ? "Token expired" : "Invalid token");
        }
    }

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
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (!result.Succeeded)
            return Unauthorized("Unsuccessful authorization");

        var claims = result.Principal?.Identities?.FirstOrDefault()?.Claims;
        var email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var avatar = claims?.FirstOrDefault(c => c.Type == "account_avatar")?.Value;

        if (email == null)
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

        user.AvatarUrl = avatar ?? string.Empty;

        var token = JwtService.GenerateToken(user);

        return Redirect($"http://localhost:5173/auth?token={token}");
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { message = "Logged out" });
    }
}

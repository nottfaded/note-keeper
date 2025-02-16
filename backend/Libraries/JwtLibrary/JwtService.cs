using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DatabaseLibrary.Models;
using Microsoft.IdentityModel.Tokens;

namespace JwtLibrary;

public static class JwtService
{
    public static string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email),
            new("account_avatar", user.AvatarUrl)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecretKey));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public static ClaimsPrincipal? ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var principal = tokenHandler.ValidateToken(
                token,
                JwtSettings.TokenValidationParameters,
                out _);

            return principal;
        }
        catch (SecurityTokenExpiredException)
        {
            throw new Exception("TokenExpired");
        }
        catch
        {
            return null;
        }
    }
}
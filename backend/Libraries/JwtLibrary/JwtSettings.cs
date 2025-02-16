using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace JwtLibrary;

public static class JwtSettings
{
    public const string SecretKey = "_YOUR_VERY_VERY_STRONG_SECRET_KEY_";
    public static readonly TokenValidationParameters TokenValidationParameters = new()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
}
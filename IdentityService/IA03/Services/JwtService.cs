using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IA03.Config;
using IA03.DTO;
using Microsoft.IdentityModel.Tokens;

namespace IA03.Services
{
    public class JwtService
    {
        private readonly JwtSettings _jwtSettings;

        public JwtService(IConfiguration configuration)
        {
            _jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>()?? new JwtSettings();
        }

        private string _secret => _jwtSettings.Secret??string.Empty;
        private string _issuer => _jwtSettings.Issuer??string.Empty;
        private string _audience => _jwtSettings.Audience??string.Empty;   
        private readonly TimeSpan _expiration = TimeSpan.FromHours(24);

        public string GenerateToken(PublicUserInfo info)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secret);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Email, info.Email),
                new(JwtRegisteredClaimNames.Sub, info.Email),
                new(ClaimTypes.Role, info.Role??string.Empty),
                new Claim("user_name", info.Name),
                new Claim("picture", info.Picture??string.Empty),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(_expiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _issuer,
                Audience = _audience,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
    }
}
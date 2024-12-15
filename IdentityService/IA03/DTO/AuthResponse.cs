using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IA03.DTO
{
    public class AuthResponse
    {
        public string AccessToken { get; set; } = null!;
        public string TokenType { get; set; } = "Bearer";
        public int? ExpiresIn { get; set; }
        public string RefreshToken { get; set; } = "";
        public string? GoogleAccessToken { get; set; }
    }
}
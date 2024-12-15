using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using IA03.Config;
using IA03.Data;
using IA03.DTO;
using IA03.Models;
using IA03.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Application.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class Auth : ControllerBase
    {
        
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;
        public Auth(AppDbContext context, JwtService jwtService)
        {
            _jwtService = jwtService;
            _context = context;
        }
         

        [HttpPost("login")]
        public async Task<IActionResult> UserLogin([FromBody] LoginRecord loginInfo)
        {
            if (string.IsNullOrEmpty(loginInfo.Email) || string.IsNullOrEmpty(loginInfo.Password))
            {
                return BadRequest("Email and Password are required.");
            }
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginInfo.Email);

            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email" });
            }

            using var sha256 = SHA256.Create();
            var passwordHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(loginInfo.Password));

            if (!passwordHash.SequenceEqual(user.Hash))
            {
                return Unauthorized(new { Message = "Wrong password" });
            }

            
            var tokenString = _jwtService.GenerateToken(new PublicUserInfo()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name
            });

            return Ok(new AuthResponse()
            {
                AccessToken = tokenString,
                TokenType = "Bearer",
                RefreshToken = ""
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> UserRegister([FromBody] JsonElement  registrationInfo)
        {

            var email = registrationInfo.GetProperty("email").GetString();
            var name = registrationInfo.GetProperty("name").GetString();
            var password = registrationInfo.GetProperty("password").GetString();


            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = "Email, Name, and Password are required." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                return BadRequest(new { Message = "Email has already existed!" });
            }

            using var sha256 = SHA256.Create();
            var passwordHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

            var newUser = new User
            {
                Email = email,
                Name = name,
                Hash = passwordHash
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            
            
            var tokenString = _jwtService.GenerateToken(new PublicUserInfo()
            {
                Id = newUser.Id,
                Email = newUser.Email,
                Name = newUser.Name
            });

            return Ok(new AuthResponse()
            {
                AccessToken = tokenString,
                TokenType = "Bearer",
                RefreshToken = ""
            });
        }

    }
}
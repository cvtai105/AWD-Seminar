using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using IA03.Config;
using IA03.DTO;
using IA03.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace IA03.Controllers
{

    [Route("api/oauth2")]
    public class OAuth2 : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<OAuth2> _logger;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly GoogleAuthSettings _googleOpenId;
        private  string _googleClientId => _googleOpenId.ClientId;
        private  string _googleClientSecret => _googleOpenId.ClientSecret;
        private  string _googleRedirectUri => _googleOpenId.RedirectUri;

        public OAuth2(IHttpClientFactory httpClientFactory, ILogger<OAuth2> logger, JwtService jwtService, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _logger = logger;
            _jwtService = jwtService;
            _configuration = configuration;
            _googleOpenId = configuration.GetSection("GoogleAuthSettings").Get<GoogleAuthSettings>()?? new GoogleAuthSettings();
        }

        [HttpGet("google")]
        public async Task<IActionResult> ExchangeCodeForToken([FromQuery] string code, [FromQuery] string redirect_uri)
        {
            if (string.IsNullOrEmpty(code))
            {
                return BadRequest(new { error = "Code is required" });
            }
            if (string.IsNullOrEmpty(redirect_uri))
            {
                return BadRequest(new { error = "Redirect URI is required" });
            }

            var tokenEndpoint = "https://oauth2.googleapis.com/token";

            var postData = new Dictionary<string, string>
            {
                { "code", HttpUtility.UrlDecode(code) },
                { "client_id", _googleClientId },
                { "client_secret", _googleClientSecret },
                { "redirect_uri", redirect_uri },
                { "grant_type", "authorization_code" }
            };

            using (var httpClient = new HttpClient())
            {
                // Prepare the request content
                var content = new FormUrlEncodedContent(postData);

                try
                {
                    // Send the POST request to the token endpoint
                    var response = await httpClient.PostAsync(tokenEndpoint, content);

                    if (response.IsSuccessStatusCode)
                    {
                        // Parse the response JSON to get the access token
                        var responseContent = await response.Content.ReadAsStringAsync();
                        var tokenResponse = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseContent);

                        // decode the id_token
                        var idToken = tokenResponse?["id_token"]??string.Empty;
                        var parts = idToken.Split('.');

                        var payload = parts[1];
                        int padding = payload.Length % 4 == 0 ? 0 : 4 - payload.Length % 4;
                        payload = payload.PadRight(payload.Length + padding, '=');

                        var decoded = Convert.FromBase64String(payload);
                        var decodedString = Encoding.UTF8.GetString(decoded);
                        
                        var userInfo = JsonConvert.DeserializeObject<Dictionary<string, string>>(decodedString);

                        var tokenString = _jwtService.GenerateToken(new PublicUserInfo()
                        {
                            Email = userInfo?["email"]??string.Empty,
                            Name = userInfo?["name"]??string.Empty,
                            Picture = userInfo?["picture"]
                        });

                        return Ok(new AuthResponse()
                        {
                            AccessToken = tokenString,
                            GoogleAccessToken = tokenResponse?["access_token"]
                        });
                    }
                    else
                    {
                        // If the request failed, return the error details
                        var errorResponse = await response.Content.ReadAsStringAsync();
                        return BadRequest(new { error = errorResponse });
                    }
                }
                catch (Exception ex)
                {
                    // Log the error and return a 500 status code if an exception occurs
                    _logger.LogError(ex, "An error occurred while exchanging the code for a token");
                    return StatusCode(500, ex.Message);
                }
            }

        }
        
      
    }

    public class ExchangeCodeRequest
    {
        public string Code { get; set; } = string.Empty;
    }

    public class GoogleTokenResponse
    {
        public string AccessToken { get; set; } = string.Empty;
        public string TokenType { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public string Scope { get; set; } = string.Empty;
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IA03.Config
{
    public class GoogleAuthSettings
    {
        public string ClientId { get; set; } = "";
        public string ClientSecret { get; set; } = "";
        public string RedirectUri { get; set; } = "";
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IA03.DTO
{
    public class PublicUserInfo
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Picture { get; set; }
        public string? Role { get; set; }
    }
}
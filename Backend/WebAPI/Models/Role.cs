﻿namespace WebAPI.Models
{
    public class Role
    {
        public int RoleID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}

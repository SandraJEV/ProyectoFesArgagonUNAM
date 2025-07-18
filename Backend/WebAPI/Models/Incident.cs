namespace WebAPI.Models
{
    public class Incident
    {
        public int IncidentID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int AreaID { get; set; } // FK con Area
        public int CreatedBy { get; set; } // FK con Users
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsResolved { get; set; } = false;
    }
}

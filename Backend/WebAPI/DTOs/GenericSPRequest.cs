namespace WebAPI.DTOs
{
    public class GenericSPRequest
    {
        public string ProcedureName { get; set; } = string.Empty;

        public Dictionary<string, object> Parameters { get; set; } = new();
    }
}
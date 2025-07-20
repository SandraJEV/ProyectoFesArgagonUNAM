namespace WebAPI.Models
{
    public class FormFieldWithValidation
    {
        public int FormId { get; set; }
        public int FieldId { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Placeholder { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public decimal OrderNumber { get; set; }
        public int? RuleId { get; set; }
        public string? RuleType { get; set; }
        public string? RuleValue { get; set; }
        public string? Message { get; set; }
    }

}

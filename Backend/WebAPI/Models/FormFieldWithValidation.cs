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
        public string CssClass { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public decimal OrderNumber { get; set; }
        public int? RuleId { get; set; }
        public string? RuleType { get; set; }
        public string? RuleValue { get; set; }
        public string? Message { get; set; }
        public int? DataSourceId { get; set; }
        public string? DataSourceName { get; set; }
        public string? SelectFields { get; set; }
        public string? FromClause { get; set; }
        public string? JoinClause { get; set; }
        public string? WhereClause { get; set; }
        public string? OrderBy { get; set; }
        public string ElementType { get; set; } = string.Empty;
    }

}

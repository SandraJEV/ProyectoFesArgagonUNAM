using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using WebAPI.DTOs; // Si usas un DTO, si no, puedes quitar esta línea

namespace WebAPI.Services
{
    public class FormRenderService
    {
        private readonly DbConnectionFactory _connectionFactory;

        public FormRenderService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // Este método llama al SP y devuelve los campos con sus validaciones
        public async Task<SPResult<object>> GetFieldAndValidationAsync(int formId)
        {
            using var conn = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@FormId", formId);
            parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultMessage", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);

            var raw = (await conn.QueryAsync<FormFieldWithValidation>(
                "GetFormFieldsWithValidations",
                param: parameters,
                commandType: CommandType.StoredProcedure
            )).ToList();

            // Separar fields y buttons
            var fieldsRaw = raw.Where(x => x.ElementType == "FIELD").ToList();
            var buttonsRaw = raw.Where(x => x.ElementType == "BUTTON").ToList();

            var fields = new List<object>();

            foreach (var g in fieldsRaw.GroupBy(f => f.FieldId))
            {
                var first = g.First();

                //  DataSource
                var options = first.Type == "select" && first.DataSourceId != null
                    ? await ResolveDataSource(first)
                    : null;

                fields.Add(new
                {
                    formId = first.FormId,
                    fieldId = g.Key,
                    fieldName = first.FieldName,
                    label = first.Label,
                    type = first.Type,
                    placeholder = first.Placeholder,
                    isRequired = first.IsRequired,
                    orderNumber = first.OrderNumber,
                    LinkTarget = first.LinkTarget,
                    LinkHref = first.LinkHref,
                    LinkText = first.LinkText,
                    options = options,

                    validations = g
                        .Where(x => x.RuleId != null)
                        .Select(x => new
                        {
                            ruleType = x.RuleType,
                            ruleValue = x.RuleValue,
                            message = x.Message
                        }).ToList()
                });
            }

            // BOTONES
            var buttons = buttonsRaw
                .Select(b => new
                {
                    fieldId = b.FieldId,
                    label = b.Label,
                    type = b.Type,
                    orderNumber = b.OrderNumber,
                    CssClass = b.CssClass
                })
                .OrderBy(b => b.orderNumber)
                .ToList();

            var resultCode = parameters.Get<int>("@ResultCode");
            var resultMessage = parameters.Get<string>("@ResultMessage");

            return new SPResult<object>
            {
                ResultCode = resultCode,
                ResultMessage = resultMessage,
                Data = new
                {
                    fields = fields.OrderBy(f => ((dynamic)f).orderNumber),
                    buttons = buttons
                }
            };
        }

        private async Task<IEnumerable<object>> ResolveDataSource(FormFieldWithValidation field)
        {
            using var conn = _connectionFactory.CreateConnection();

            var query = $@"
                    SELECT {field.SelectFields}
                    FROM {field.FromClause}
                    {(string.IsNullOrEmpty(field.JoinClause) ? "" : field.JoinClause)}
                    {(string.IsNullOrEmpty(field.WhereClause) ? "" : "WHERE " + field.WhereClause)}
                    {(string.IsNullOrEmpty(field.OrderBy) ? "" : "ORDER BY " + field.OrderBy)}
                    ";

            return await conn.QueryAsync(query);
        }
    }
}

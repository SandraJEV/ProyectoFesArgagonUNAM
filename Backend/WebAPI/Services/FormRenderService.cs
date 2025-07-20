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
        public async Task<SPResult<List<FormFieldWithValidation>>> GetFieldAndValidationAsync(int formId)
        {
            using var conn = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@FormId", formId); // Parámetro de entrada al SP
            parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultMessage", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);

            // Ejecutar el SP que devuelve múltiples registros
            var data = (await conn.QueryAsync<FormFieldWithValidation>(
                "GetFormFieldsWithValidations",
                param: parameters,
                commandType: CommandType.StoredProcedure
            )).ToList();

            // Leer los valores de salida
            var resultCode = parameters.Get<int>("@ResultCode");
            var resultMessage = parameters.Get<string>("@ResultMessage");

            // Devolver el resultado estructurado
            return new SPResult<List<FormFieldWithValidation>>
            {
                ResultCode = resultCode,
                ResultMessage = resultMessage,
                Data = data
            };
        }
    }
}

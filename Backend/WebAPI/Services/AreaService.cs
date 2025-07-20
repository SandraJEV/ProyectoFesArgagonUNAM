
using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using WebAPI.DTOs;

namespace WebAPI.Services
{
    public class AreaService
    {
        private readonly DbConnectionFactory _connectionFactory;

        public AreaService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // Consulta directa
        public async Task<SPResult<IEnumerable<Area>>> GetAllAreasAsync()
        {
            try
            {
                using IDbConnection conn = _connectionFactory.CreateConnection();
                string sql = "SELECT * FROM Areas WHERE IsActive = 1";
                var result = await conn.QueryAsync<Area>(sql);

                return new SPResult<IEnumerable<Area>>
                {
                    ResultCode = 0,
                    ResultMessage = "Consulta exitosa.",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new SPResult<IEnumerable<Area>>
                {
                    ResultCode = 99,
                    ResultMessage = "Error en GetAllAreasAsync: " + ex.Message,
                    Data = Enumerable.Empty<Area>()
                };
            }
        }

        

    }
}

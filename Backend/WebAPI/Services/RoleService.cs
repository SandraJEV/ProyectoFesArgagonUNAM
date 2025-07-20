using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using WebAPI.DTOs; // Asegúrate de tener el DTO SPResult aquí

namespace WebAPI.Services
{
    public class RoleService
    {
        private readonly DbConnectionFactory _connectionFactory;

        public RoleService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        /// <summary>
        /// Consulta todos los roles disponibles en la base de datos.
        /// </summary>
        /// <returns>Un objeto SPResult con la lista de roles o un mensaje de error.</returns>
        public async Task<SPResult<IEnumerable<Role>>> GetAllRoleAsync()
        {
            try
            {
                using IDbConnection conn = _connectionFactory.CreateConnection();

                string sql = "SELECT * FROM Roles";

                var roles = await conn.QueryAsync<Role>(sql);

                return new SPResult<IEnumerable<Role>>
                {
                    ResultCode = 0,
                    ResultMessage = "Consulta exitosa.",
                    Data = roles
                };
            }
            catch (Exception ex)
            {
                return new SPResult<IEnumerable<Role>>
                {
                    ResultCode = 99,
                    ResultMessage = ex.Message,
                    Data = Enumerable.Empty<Role>() // o null si se cambia
                };
            }
        }
    }
}

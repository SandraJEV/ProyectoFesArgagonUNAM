using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;


namespace WebAPI.Services
{
    public class RoleService
    {
        // Campo privado para guardar la fábrica de conexiones
        private readonly DbConnectionFactory _connectionFactory;

        // Constructor que recibe la fábrica por inyección de dependencias
        public RoleService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Role>> GetAllRoleAsync()
        {
            // Abre una conexión a la base de datos usando la clase personalizada
            using IDbConnection conn = _connectionFactory.CreateConnection();

            // Consulta SQL para obtener usuarios activos
            string sql = "SELECT * FROM Roles";

            // Ejecuta la consulta y mapea automáticamente los resultados a objetos Role
            return await conn.QueryAsync<Role>(sql);
        }

    }
}

// Importa espacios de nombres necesarios (omitible si usas global using)
using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;

namespace WebAPI.Services
{
    public class AreaService
    {
        private readonly DbConnectionFactory _connectionFactory;

        public AreaService(DbConnectionFactory connectionFactory) 
        { 
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Area>> GetAllAreaAsync() 
        {
            using IDbConnection conn = _connectionFactory.CreateConnection();

            string sql = "SELECT * FROM Areas WHERE IsActive = 1";

            return await conn.QueryAsync<Area>(sql);
        }
    }
}

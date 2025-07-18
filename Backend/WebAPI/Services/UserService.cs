// Importa espacios de nombres necesarios (omitible si usas global using)
using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;

namespace WebAPI.Services
{
    // Esta clase se encargará de acceder a la base de datos para todo lo relacionado con usuarios
    public class UserService
    {
        // Campo privado para guardar la fábrica de conexiones
        private readonly DbConnectionFactory _connectionFactory;

        // Constructor que recibe la fábrica por inyección de dependencias
        public UserService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // Método asincrónico que devuelve una lista de usuarios activos desde la base de datos
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            // Abre una conexión a la base de datos usando la clase personalizada
            using IDbConnection conn = _connectionFactory.CreateConnection();

            // Consulta SQL para obtener usuarios activos
            string sql = "SELECT * FROM Users WHERE IsEnabled = 1";

            // Ejecuta la consulta y mapea automáticamente los resultados a objetos User
            return await conn.QueryAsync<User>(sql);
        }

        // Método asincrónico que devuelve una lista de usuarios activos desde la base de datos
        public async Task<User?> GetUserByIdAsync(int userId)
        {
            // Abre una conexión a la base de datos usando la clase personalizada
            using IDbConnection conn = _connectionFactory.CreateConnection();

            // Consulta SQL para obtener usuarios activos
            string sql = "SELECT * FROM Users WHERE UserID = @UserID";

            // Ejecuta la consulta y mapea automáticamente los resultados a objetos User
            return await conn.QueryFirstOrDefaultAsync<User>(
                sql,
                new { UserID = userId } // Este es el parámetro que declaraste en la firma
            );
        }
        public async Task<(int ResultCode, string ResultMessage)> UpdateUserAsync(User user)
        {
            // Abre una conexión a la base de datos usando una fábrica de conexiones (inyectada)
            // Esto mejora la reutilización y facilita las pruebas unitarias
            using var conn = _connectionFactory.CreateConnection();

            // Se preparan los parámetros que se enviarán al procedimiento almacenado
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", user.UserID);
            parameters.Add("@FirstName", user.FirstName);
            parameters.Add("@LastName", user.LastName);
            parameters.Add("@Email", user.Email);
            parameters.Add("@PasswordHash", user.PasswordHash);
            parameters.Add("@RoleID", user.RoleID);
            parameters.Add("@AreaID", user.AreaID);
            parameters.Add("@ReportsTo", user.ReportsTo);

            // Se definen los parámetros de salida del SP
            parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultMessage", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);

            // Se ejecuta el procedimiento almacenado con los parámetros dados
            await conn.ExecuteAsync("SP_UpdateUser", parameters, commandType: CommandType.StoredProcedure);

            // Se obtienen los valores de salida del SP
            int resultCode = parameters.Get<int>("@ResultCode");
            string resultMessage = parameters.Get<string>("@ResultMessage");

            // Se devuelve el código y el mensaje de resultado
            return (resultCode, resultMessage);
        }

        public async Task<(int ResultCode, string ResultMessage, int? UserID)> CreateUserAsync(User user)
        {
            using var conn = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@FirstName", user.FirstName);
            parameters.Add("@LastName", user.LastName);
            parameters.Add("@Email", user.Email);
            parameters.Add("@PasswordHash", user.PasswordHash);
            parameters.Add("@RoleID", user.RoleID);
            parameters.Add("@AreaID", user.AreaID);
            parameters.Add("@ReportsTo", user.ReportsTo);

            parameters.Add("@UserID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultMessage", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);

            await conn.ExecuteAsync("SP_CreateUser", parameters, commandType: CommandType.StoredProcedure);

            int resultCode = parameters.Get<int>("@ResultCode");
            string resultMessage = parameters.Get<string>("@ResultMessage");
            int? userID = parameters.Get<int?>("@UserID");

            return (resultCode, resultMessage, userID);
        }


    }
}

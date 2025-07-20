// Importa los paquetes necesarios
using Dapper;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using WebAPI.DTOs;

namespace WebAPI.Services
{
    /// <summary>
    /// Servicio responsable de gestionar operaciones relacionadas con los usuarios en la base de datos.
    /// Utiliza Dapper y procedimientos almacenados.
    /// </summary>
    public class UserService
    {
        private readonly DbConnectionFactory _connectionFactory;

        /// <summary>
        /// Constructor que recibe la fábrica de conexión por inyección de dependencias.
        /// </summary>
        public UserService(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        /// <summary>
        /// Obtiene todos los usuarios activos registrados en la base de datos.
        /// </summary>
        public async Task<SPResult<IEnumerable<User>>> GetAllUsersAsync()
        {
            try
            {
                using IDbConnection conn = _connectionFactory.CreateConnection();

                string sql = "SELECT * FROM Users WHERE IsEnabled = 1";

                var users = await conn.QueryAsync<User>(sql);

                return new SPResult<IEnumerable<User>>
                {
                    ResultCode = 0,
                    ResultMessage = "Consulta exitosa.",
                    Data = users
                };
            }
            catch (Exception ex) 
            {
                return new SPResult<IEnumerable<User>>
                {
                    ResultCode = 99,
                    ResultMessage = ex.Message,
                    Data = Enumerable.Empty<User>() // o null si se cambia
                };
            }
        }

        /// <summary>
        /// Obtiene un usuario específico por su ID.
        /// </summary>
        /// <param name="userId">Identificador del usuario</param>
        public async Task<SPResult<User?>> GetUserByIdAsync(int userId)
        {
            try
            {
                using IDbConnection conn = _connectionFactory.CreateConnection();

                string sql = "SELECT * FROM Users WHERE UserID = @UserID AND IsEnabled = 1";

                var user = await conn.QueryFirstOrDefaultAsync<User>(sql, new { UserID = userId });

                if (user == null)
                {
                    return new SPResult<User?>
                    {
                        ResultCode = 1,
                        ResultMessage = "Usuario no encontrado.",
                        Data = null
                    };
                }

                return new SPResult<User?>
                {
                    ResultCode = 0,
                    ResultMessage = "Consulta exitosa.",
                    Data = user
                };
            }
            catch (Exception ex)
            {
                return new SPResult<User?>
                {
                    ResultCode = 99,
                    ResultMessage = $"Error inesperado: {ex.Message}",
                    Data = null
                };
            }
        }

        /// <summary>
        /// Actualiza los datos de un usuario existente mediante SP_UpdateUser.
        /// </summary>
        /// <param name="user">Objeto usuario con la información actualizada</param>
        public async Task<SPResult<object>> UpdateUserAsync(User user)
        {
            using var conn = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@UserID", user.UserID);
            parameters.Add("@FirstName", user.FirstName);
            parameters.Add("@LastName", user.LastName);
            parameters.Add("@Email", user.Email);
            parameters.Add("@PasswordHash", user.PasswordHash);
            parameters.Add("@RoleID", user.RoleID);
            parameters.Add("@AreaID", user.AreaID);
            parameters.Add("@ReportsTo", user.ReportsTo);
            parameters.Add("@IsEnabled", user.IsEnabled);

            parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@ResultMessage", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);

            await conn.ExecuteAsync("SP_UpdateUser", parameters, commandType: CommandType.StoredProcedure);

            return new SPResult<object>
            {
                ResultCode = parameters.Get<int>("@ResultCode"),
                ResultMessage = parameters.Get<string>("@ResultMessage"),
                Data = null // No se devuelve un objeto específico
            };
        }

        /// <summary>
        /// Crea un nuevo usuario mediante SP_CreateUser y devuelve su ID si fue exitoso.
        /// </summary>
        /// <param name="user">Objeto usuario con los datos a registrar</param>
        public async Task<SPResult<int?>> CreateUserAsync(User user)
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

            return new SPResult<int?>
            {
                ResultCode = parameters.Get<int>("@ResultCode"),
                ResultMessage = parameters.Get<string>("@ResultMessage"),
                Data = parameters.Get<int?>("@UserID")
            };
        }
    }
}

// Importa los paquetes necesarios
using Microsoft.AspNetCore.Mvc;        // Para crear controladores y manejar solicitudes HTTP
using WebAPI.Services;                // Para acceder al servicio de usuario (UserService)
using WebAPI.Models;                  // Para usar el modelo de datos 'User'
using WebAPI.DTOs;                    // Para usar SPResult<T>

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/User

    /// <summary>
    /// Controlador responsable de manejar las peticiones relacionadas con usuarios.
    /// </summary>
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Obtiene todos los usuarios activos.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var result = await _userService.GetAllUsersAsync();

            // Si hubo error técnico
            if (result.ResultCode == 99)
                return StatusCode(500, result.ResultMessage);

            // Si no se encontraron usuarios (aunque técnicamente es éxito)
            if (result.Data == null || !result.Data.Any())
                return NotFound("No se encontraron usuarios activos.");

            // Éxito
            return Ok(result.Data);
        }

        /// <summary>
        /// Obtiene un usuario por ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var result = await _userService.GetUserByIdAsync(id);

            return result.ResultCode switch
            {
                0 => Ok(result.Data),
                1 => NotFound(result.ResultMessage),
                _ => StatusCode(500, result.ResultMessage)
            };
        }


        /// <summary>
        /// Actualiza un usuario existente mediante SP. Usa SPResult como respuesta estandarizada.
        /// </summary>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                var result = await _userService.UpdateUserAsync(user);

                return result.ResultCode switch
                {
                    0 => Ok(result),
                    1 => NotFound(result),
                    _ => StatusCode(500, result)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new SPResult<object>
                {
                    ResultCode = 99,
                    ResultMessage = "Error inesperado en UpdateUser: " + ex.Message,
                    Data = null
                });
            }
        }

        /// <summary>
        /// Crea un nuevo usuario. Devuelve su ID si fue exitoso.
        /// </summary>
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                var result = await _userService.CreateUserAsync(user);

                return result.ResultCode switch
                {
                    0 => Ok(result),
                    1 => Conflict(result),
                    _ => StatusCode(500, result)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new SPResult<object>
                {
                    ResultCode = 99,
                    ResultMessage = "Error inesperado en CreateUser: " + ex.Message,
                    Data = null
                });
            }
        }
    }
}

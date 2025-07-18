// Importa los paquetes necesarios
using Microsoft.AspNetCore.Mvc;        // Para crear controladores y manejar solicitudes HTTP
using WebAPI.Services;                // Para acceder al servicio de usuario (UserService)
using WebAPI.Models;                  // Para usar el modelo de datos 'User'


//using System.Diagnostics; // Herramienta para hacer debug


namespace WebAPI.Controllers
{
    // Indica que esta clase es un controlador API
    [ApiController]

    // Define la ruta base para este controlador: api/User
    // [controller] se reemplaza automáticamente por el nombre de la clase (sin "Controller")
    [Route("api/[controller]")]

    // Clase del controlador que manejará las solicitudes relacionadas con usuarios
    public class UserController : ControllerBase
    {
        // Campo privado para almacenar la instancia del servicio de usuario
        private readonly UserService _userService;

        // Constructor con inyección de dependencias: se recibe una instancia de UserService
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // Acción que responde a solicitudes HTTP GET en: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            //Debug.WriteLine(ControllerContext.RouteData.Values["controller"]); // "User"  Esto imprime el nombre del controlador que se usó en la solicitud (por ejemplo, "User"), usando el diccionario RouteData.

            // Llama al servicio para obtener todos los usuarios activos desde la base de datos
            var users = await _userService.GetAllUsersAsync();

            // Si no se encontraron usuarios, devuelve un código 404 (Not Found) con un mensaje
            if (users == null || !users.Any())
            {
                return NotFound("No se encontraron usuarios activos.");
            }

            // Si se encontraron usuarios, devuelve un código 200 (OK) con la lista de usuarios
            return Ok(users);
        }

        // Acción que responde a solicitudes HTTP GET en: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(int id)
        {
            //Debug.WriteLine(ControllerContext.RouteData.Values["controller"]); // "User"  Esto imprime el nombre del controlador que se usó en la solicitud (por ejemplo, "User"), usando el diccionario RouteData.

            // Llama al servicio para obtener todos los usuarios activos desde la base de datos
            var user = await _userService.GetUserByIdAsync(id);

            // Si no se encontraron usuarios, devuelve un código 404 (Not Found) con un mensaje
            if (user == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            // Si se encontraron usuarios, devuelve un código 200 (OK) con la lista de usuarios
            return Ok(user);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                var (resultCode, resultMessage) = await _userService.UpdateUserAsync(user);
                return Ok(new { resultCode, resultMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Excepción: " + ex.Message);
            }
        }

        [HttpPost("create")] // Ruta: api/User/create
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                var (resultCode, resultMessage, userID) = await _userService.CreateUserAsync(user);
                return resultCode switch
                {
                    0 => Ok(new { Message = resultMessage, UserID = userID }), // Éxito
                    1 => Conflict(resultMessage),                              // Correo duplicado
                    _ => StatusCode(500, resultMessage)                        // Otro error
                };
            } 
            catch (Exception ex)
            {
                return StatusCode(500, $"Excepción: {ex.Message}");
            }
        }



    }

}

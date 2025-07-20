// Importa los paquetes necesarios
using Microsoft.AspNetCore.Mvc;        // Para crear controladores y manejar solicitudes HTTP
using WebAPI.Services;                // Para acceder al servicio de usuario (UserService)
using WebAPI.Models;                  // Para usar el modelo de datos 'User'
using WebAPI.DTOs;                    // Para usar SPResult<T>

namespace WebAPI.Controllers
{
    // Indica que esta clase es un controlador API
    [ApiController]

    // Define la ruta base para este controlador: api/Role
    // [controller] se reemplaza automáticamente por el nombre de la clase (sin "Controller")
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService) 
        {
            _roleService = roleService;
        }


        /// <summary>
        /// Obtiene todos los roles del sistema.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            var result = await _roleService.GetAllRoleAsync();

            if (result.ResultCode == 99)
                return StatusCode(500, result.ResultMessage);

            if (result.Data == null || !result.Data.Any())
                return NotFound("No se encontraron roles.");

            return Ok(result.Data);
        }

    }
}

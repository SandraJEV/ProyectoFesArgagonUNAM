using Microsoft.AspNetCore.Mvc;       
using WebAPI.Services;                
using WebAPI.Models;

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


        // Acción que responde a solicitudes HTTP GET en: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {

            var roles = await _roleService.GetAllRoleAsync();

            if (roles == null || !roles.Any())
            {
                return NotFound("No se encontraron roles.");
            }

            return Ok(roles);
        }

    }
}

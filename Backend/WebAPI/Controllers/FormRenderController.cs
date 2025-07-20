// Importa los paquetes necesarios
using Microsoft.AspNetCore.Mvc;        // Para crear controladores y manejar solicitudes HTTP
using WebAPI.Services;                // Para acceder al servicio de  (FormRenderService)
using WebAPI.Models;                  // Para usar el modelo de datos 'FormFieldWithValidation'
using WebAPI.DTOs;



namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormRenderController : ControllerBase
    {
        private readonly FormRenderService _formRenderService;

        public FormRenderController(FormRenderService formRenderService)
        {
            _formRenderService = formRenderService;
        }

        // Este endpoint consulta los campos y validaciones de un formulario dinámico
        [HttpGet("{formId}")]
        public async Task<IActionResult> GetFieldAndValidations(int formId)
        {
            var result = await _formRenderService.GetFieldAndValidationAsync(formId);

            if (result.ResultCode == 1)
            {
                return NotFound(result.ResultMessage); // Formulario no encontrado
            }

            if (result.ResultCode == 99)
            {
                return StatusCode(500, result.ResultMessage); // Error interno en el SP
            }

            // Resultado exitoso
            return Ok(result.Data); // Aquí devuelves la lista de campos con validaciones
        }
    }
}
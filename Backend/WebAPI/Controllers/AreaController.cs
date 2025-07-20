
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs; // Asegúrate de tener SPResult<T>
using WebAPI.Models; // Reemplaza por el modelo real: Entity
using WebAPI.Services; // Reemplaza por el servicio real: EntityService

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly AreaService _areaService;

        public AreaController(AreaService areaService)
        {
            _areaService = areaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> GetAllAreas()
        {
            try
            {
                var result = await _areaService.GetAllAreasAsync();

                if (result.ResultCode == 99)
                    return StatusCode(500, result.ResultMessage);

                if (result.Data == null || !result.Data.Any())
                    return NotFound("No se encontraron registros de tipo Area.");

                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new SPResult<object>
                {
                    ResultCode = 99,
                    ResultMessage = "Error inesperado en GetAll: " + ex.Message,
                    Data = null
                });
            }
        }

        

       
    }
}

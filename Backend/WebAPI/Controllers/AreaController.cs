using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
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
            var areas = await _areaService.GetAllAreaAsync();

            if (areas == null)
            {
                return NotFound("No se encontrón áreas para seleccionar");
            }

            return Ok(areas);
        }
    }

}

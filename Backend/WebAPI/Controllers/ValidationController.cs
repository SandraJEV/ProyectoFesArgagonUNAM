//using Microsoft.AspNetCore.Mvc;
//using WebAPI.Services;
//using WebAPI.Models;



//namespace WebAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[Controller]")]
//    public class ValidationController : ControllerBase
//    {
//        private readonly  ValidationService _validationService;

//        public ValidationController(ValidationService validationService)
//        {
//            _validationService = validationService;
//        }

//        [HttpGet("{FieldName}")]
//        public async Task<ActionResult<IEnumerable<Rule>>> GetRule(string FieldName) 
//        {
//            var rules = await _validationService.GetValidationByFieldNameAsync(FieldName);

//            if (rules == null || !rules.Any())
//            {
//                return NotFound("Campo no encontrado, verifica que el ID del input o select exista en la tabla de validaciones.");
//            }

//            return Ok(rules); // ✅ Ahora sí devuelve la lista si se encontró
//        }
//    }
//}

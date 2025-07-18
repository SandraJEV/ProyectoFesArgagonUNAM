// Usamos los espacios de nombres necesarios para:
// - Controladores y respuestas HTTP (Microsoft.AspNetCore.Mvc)
// - Tipos de conexión de base de datos (System.Data)
// - Nuestra clase para obtener la cadena de conexión (WebAPI.Data)
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebAPI.Data;

namespace WebAPI.Controllers
{
    // Indica que esta clase es un controlador de API
    [ApiController]

    // Define la ruta base para este controlador: api/health
    // [controller] será reemplazado automáticamente por "health" (nombre del controlador sin "Controller")
    [Route("api/[controller]")]
    public class HealthController : ControllerBase // Hereda de ControllerBase para usar funcionalidades de Web API
    {
        // Campo privado para acceder a la fábrica de conexiones
        private readonly DbConnectionFactory _connectionFactory;

        // Constructor que recibe la dependencia DbConnectionFactory (inyección de dependencias)
        public HealthController(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // Método que expone un endpoint HTTP GET en: api/health/check-database
        [HttpGet("check-database")]
        public IActionResult CheckDatabase()
        {
            try
            {
                // Crea y abre una conexión a la base de datos usando la clase personalizada
                using IDbConnection conn = _connectionFactory.CreateConnection();
                conn.Open();

                // Verifica si la conexión se abrió correctamente
                if (conn.State == ConnectionState.Open)
                {
                    // Retorna un 200 OK con mensaje de éxito si la conexión fue exitosa
                    return Ok("✅ Conexión a la base de datos exitosa.");
                }

                // Si no se pudo abrir la conexión, retorna error 500
                return StatusCode(500, "❌ No se pudo abrir la conexión.");
            }
            catch (Exception ex)
            {
                // Si ocurre cualquier excepción, se retorna un error 500 con el mensaje de la excepción
                return StatusCode(500, $"❌ Error al conectar: {ex.Message}");
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

[ApiController]
[Route("api/[controller]")]
public class GenericSPController : ControllerBase
{
    private readonly GenericSPService _service;

    public GenericSPController(GenericSPService service)
    {
        _service = service;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> Execute([FromBody] GenericSPRequest request)
    {
        var result = await _service.ExecuteAsync(request);

        if (result.ResultCode == 99)
            return StatusCode(500, result);

        return Ok(result);
    }
}
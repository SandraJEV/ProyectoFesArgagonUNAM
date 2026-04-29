using Dapper;
using System.Data;
using WebAPI.Data;
using System.Text.Json;
using WebAPI.DTOs;

public class GenericSPService
{
    private readonly DbConnectionFactory _connectionFactory;

    public GenericSPService(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<SPResult<IEnumerable<dynamic>>> ExecuteAsync(GenericSPRequest request)
    {
        using var conn = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        foreach (var param in request.Parameters)
        {
            object value = param.Value;

            if (value is JsonElement jsonElement)
            {
                switch (jsonElement.ValueKind)
                {
                    case JsonValueKind.String:
                        value = jsonElement.GetString();
                        break;

                    case JsonValueKind.Number:
                        if (jsonElement.TryGetInt32(out int intVal))
                            value = intVal;
                        else if (jsonElement.TryGetInt64(out long longVal))
                            value = longVal;
                        else
                            value = jsonElement.GetDecimal();
                        break;

                    case JsonValueKind.True:
                    case JsonValueKind.False:
                        value = jsonElement.GetBoolean();
                        break;

                    case JsonValueKind.Null:
                        value = null;
                        break;

                    default:
                        value = jsonElement.ToString();
                        break;
                }
            }

            parameters.Add($"@{param.Key}", value);
        }

        parameters.Add("@ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);
        parameters.Add("@ResultMessage", dbType: DbType.String, size: 500, direction: ParameterDirection.Output);

        //  PRIMERO ejecutas
        var data = await conn.QueryAsync(
            request.ProcedureName,
            parameters,
            commandType: CommandType.StoredProcedure
        );

        //  LUEGO lees outputs
        var resultCode = parameters.Get<int>("@ResultCode");
        var resultMessage = parameters.Get<string>("@ResultMessage");

        return new SPResult<IEnumerable<dynamic>>
        {
            ResultCode = resultCode,
            ResultMessage = resultMessage,
            Data = data
        };
    }

}
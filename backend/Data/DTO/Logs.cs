
using Episafe.DB;
using Postgrest.Responses;
using System.Text.Json.Serialization;
using static Postgrest.Constants;

namespace Episafe.Data.DTO;

public class Logs
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("timestamp")]
    public DateTime? Timestamp { get; set; }

    [JsonPropertyName("type")]
    public int Type { get; set; }

    [JsonPropertyName("user")]
    public int? UserId { get; set; }

    [JsonPropertyName("usergroup")]
    public int? UserGroupId { get; set; }
    [JsonPropertyName("door")]
    public int? DoorId { get; set; }
    [JsonPropertyName("doorgroup")]
    public int? DoorGroupId { get; set; }

    public async static Task<List<Logs>> GetAllLogs(Supabase.Client client)
    {
        List<Logs> result = new List<Logs>();
        var logs = await client.Postgrest.Table<DB.Logs>().Get();
        foreach (DB.Logs log in logs.Models)
        {
            Logs log_dto = new Logs();
            log_dto.Id = log.Id;
            log_dto.Timestamp = log.Timestamp;
            log_dto.Type = log.Type;
            log_dto.UserId = log.UserId;
            log_dto.UserGroupId = log.UserGroupId;
            log_dto.DoorId = log.DoorId;
            log_dto.DoorGroupId = log.DoorGroupId;
            result.Add(log_dto);
        }
        return result;
    }

    public async static Task<bool> DeleteAll(Supabase.Client client)
    {
        await client.Postgrest.Table<DB.Logs>().Where(x => x.Id != -1).Delete();

        return true;
    }
}
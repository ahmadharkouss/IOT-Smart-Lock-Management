using System.Text.Json.Serialization;
using System.Xml.Linq;
using Episafe.DB;
using Episafe.Engine.Exceptions;
using Postgrest;
using Postgrest.Responses;
using static Postgrest.Constants;
namespace Episafe.Data.DTO;

public class Doors
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("door_groups")] 
    public List<int> DoorGroups { get; set; } = [];
    
    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }

    public async static Task<List<Doors>> GetAllDoors(Supabase.Client client)
    {
        List<Doors> result = new List<Doors>();
        var door = await client.Postgrest.Table<DB.Doors>().Get();
        foreach (DB.Doors doors in door.Models)
        {
            Doors doors_db = new Doors();
            doors_db.Id = doors.Id;
            doors_db.Name = doors.Name;
            doors_db.CreatedAt = doors.CreatedAt;
            ModeledResponse<DB.DoorGroupDoor> doorgroupModels = await client.Postgrest.Table<DB.DoorGroupDoor>()
            .Filter(x => x.id_door, Operator.Equals, doors.Id)
            .Get();
            IEnumerable<int> doorgroupIds = doorgroupModels.Models.Where(x =>
            {
                if (x.validity.HasValue)
                {
                    if (DateTime.Compare(x.validity.Value, DateTime.UtcNow) > 0)
                    {
                        return true;
                    }
                    return false;
                }
                return true;
            }).Select(x => x.id_doorgroup);
            doors_db.DoorGroups = doorgroupIds.ToList();
            result.Add(doors_db);
        }
        return result;
    }

    public static async Task<Doors> GetDoorById(int doorId, Supabase.Client client)
    {
        ModeledResponse<DB.Doors>? doorModels = await client.Postgrest
            .Table<DB.Doors>()
            .Filter(x => x.Id, Constants.Operator.Equals, doorId)
            .Get();
        DB.Doors door = doorModels.Models.First();

        ModeledResponse<DB.DoorGroupDoor> doorGroupModel = await client.Postgrest
            .Table<DB.DoorGroupDoor>()
            .Filter(x => x.id_door, Constants.Operator.Equals, doorId)
            .Get();

        IEnumerable<int> groupsIds = doorGroupModel.Models.Where(x =>
            {
                if (!x.validity.HasValue) return true;
                return DateTime.Compare(x.validity.Value, DateTime.UtcNow) > 0;
            })
            .Select(x => x.id_doorgroup);
        Doors ext = new Doors
        {
            Id = doorId,
            Name = door.Name ?? "",
            CreatedAt = door.CreatedAt,
            DoorGroups = groupsIds.ToList()
        };

        return ext;
    }

    public static async Task<Doors?> CreateDoor(string name, Supabase.Client client)
    {
        try
        {
            // Vérifie si la porte existe déjà
            //var final_door = await client.From<DB.Doors>().Get(); 
            var final_door = await client.Postgrest.Table<DB.Doors>().Where(x => x.Name == name).Limit(1).Get();

            if (!final_door.Models.Any())
            {
                var new_door = new DB.Doors();
                new_door.Name = name;
                var res = await client.Postgrest.Table<DB.Doors>().Insert(new_door);
                var up_door = res.Models.FirstOrDefault();
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, null, null, up_door.Id, null));
                return await GetDoorById(up_door.Id, client);
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception while creating door: {ex.Message}");
            throw ex;
        }
    }

    public static async Task<Doors?> DeleteDoor(int id_door, Supabase.Client client)
    {
        var final_door = await client.Postgrest.Table<DB.Doors>().Filter(x => x.Id, Constants.Operator.Equals, id_door).Limit(1).Get();
        if (final_door.Models.Count() == 1)
        {
            var result = await GetDoorById(id_door, client);
            var up_door = final_door.Models.FirstOrDefault();
            var res = await client.Postgrest.Table<DB.Doors>().Delete(up_door);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, null, null, up_door.Id, null));
                return result;
            }
            return null;
        }

        return null;
    }

    public static async Task<Doors?> UpdateDoor(int id_door, string name, Supabase.Client client)
    {
        var final_door = await client.Postgrest.Table<DB.Doors>().Where(x => x.Id == id_door).Limit(1).Get();
        if (final_door.Models.Any())
        {
            var up_door = final_door.Models.FirstOrDefault();
            up_door.Name = name;
            var res = await client.Postgrest.Table<DB.Doors>().Update(up_door);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(2, null, null, up_door.Id, null));
                return (await GetDoorById(id_door, client));
            }
            return null;
        }
        return null;
    }

    public static async Task<bool> AddToDoorGroup(int id_door, int id_doorgroup, DateTime? validity, Supabase.Client client)
    {
        try
        {
            var final_door = await client.Postgrest.Table<DB.Doors>().Where(x => x.Id == id_door).Limit(1).Get();
            var final_doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Where(x => x.Id == id_doorgroup).Limit(1).Get();
            var inserted = await client.Postgrest.Table<DB.DoorGroupDoor>().Where(x => x.id_door == id_door && x.id_doorgroup == id_doorgroup).Limit(1).Get();
            if (final_door.Models.Any() && final_doorgroup.Models.Any() && !inserted.Models.Any())
            {
                var new_add = new DB.DoorGroupDoor();
                new_add.id_door = id_door;
                new_add.id_doorgroup = id_doorgroup;
                new_add.validity = validity;
                var res = await client.Postgrest.Table<DB.DoorGroupDoor>().Insert(new_add);
                if (res.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, null, null, id_door, id_doorgroup));
                    return true;
                }
                return false;
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception while creating door: {ex.Message}");
            throw ex;
        }
    }

    public static async Task<bool> RemoveFromDoorGroup(int id_door, int id_doorgroup, Supabase.Client client)
    {
        var final_doorgroupdoor = await client.Postgrest.Table<DB.DoorGroupDoor>().Where(x => x.id_door == id_door && x.id_doorgroup == id_doorgroup).Limit(1).Get();
        if (final_doorgroupdoor.Models.Any())
        {
            var up_user = final_doorgroupdoor.Models.FirstOrDefault();
            var res = await client.Postgrest.Table<DB.DoorGroupDoor>().Delete(up_user);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, null, null, id_door, id_doorgroup));
                return true;
            }
            return false;
        }
        return false;
    }

    public static async Task<bool> Open(int id_user, int id_door, Supabase.Client client)
    {
        ModeledResponse<DB.UserGroupUser>? userGroupModels = await client.Postgrest.Table<DB.UserGroupUser>()
        .Filter(x => x.id_user, Operator.Equals, id_user)
        .Get();
        IEnumerable<int> groupIds = userGroupModels.Models.Where(x =>
        {
            if (x.validity.HasValue)
            {
                if (DateTime.Compare(x.validity.Value, DateTime.UtcNow) > 0)
                {
                    return true;
                }
                return false;
            }
            return true;
        }).Select(x => x.id_usergroup);

        ModeledResponse<DB.DoorGroupDoor> doorgroupModels = await client.Postgrest.Table<DB.DoorGroupDoor>()
        .Filter(x => x.id_door, Operator.Equals, id_door)
         .Get();
        IEnumerable<int> doorgroupIds = doorgroupModels.Models.Where(x =>
        {
            if (x.validity.HasValue)
            {
                if (DateTime.Compare(x.validity.Value, DateTime.UtcNow) > 0)
                {
                    return true;
                }
                return false;
            }
            return true;
        }).Select(x => x.id_doorgroup);
        foreach (var userGroupId in groupIds)
        {
            foreach (var doorGroupId in doorgroupIds)
            {
                var combinationResponse = await client.Postgrest.Table<UserGroupDoorGroup>()
                    .Filter(x => x.id_usergroup, Operator.Equals, userGroupId)
                    .Filter(x => x.id_doorgroup, Operator.Equals, doorGroupId)
                    .Get();
                if (combinationResponse.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(3, id_user, userGroupId, id_door, doorGroupId));
                    return true;
                }
            }
        }

        return false;
    }
}
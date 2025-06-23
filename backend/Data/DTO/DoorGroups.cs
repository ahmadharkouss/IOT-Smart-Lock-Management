using System.Text.Json.Serialization;
using Episafe.DB;
using Postgrest.Responses;
using static Postgrest.Constants;
using Supabase.Gotrue;

namespace Episafe.Data.DTO;

public class DoorGroups
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("zone_name")]
    public string ZoneName { get; set; }
    
    [JsonPropertyName("createdAt")]
    public DateTime? CreatedAt { get; set; }

    [JsonPropertyName("doors")]
    public List<int> Doors { get; set; }

    public async static Task<List<DoorGroups>> GetAllDoorGroups(Supabase.Client client)
    {
        List<DoorGroups> result = new List<DoorGroups>();
        var doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Get();
        foreach (DB.DoorGroups doorgroups in doorgroup.Models)
        {
            DoorGroups doorgroups_db = new DoorGroups();
            doorgroups_db.Id = doorgroups.Id;
            doorgroups_db.ZoneName = doorgroups.ZoneName;
            doorgroups_db.CreatedAt = doorgroups.CreatedAt;
            ModeledResponse<DB.DoorGroupDoor>? doorGroupModels = await client.Postgrest.Table<DB.DoorGroupDoor>()
            .Filter(x => x.id_doorgroup, Operator.Equals, doorgroups.Id)
            .Get();
            IEnumerable<int> groupIds = doorGroupModels.Models.Where(x =>
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
            }).Select(x => x.id_door);
            doorgroups_db.Doors = groupIds.ToList();
            result.Add(doorgroups_db);
        }
        return result;
    }
    public async static Task<List<int>> GetAllDoorGroupIds(Supabase.Client client)
    {
        List<int> result = new List<int>();
        var doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Get();
        foreach (DB.DoorGroups doorgroups in doorgroup.Models)
        {
            result.Add(doorgroups.Id);
        }
        return result;
    }

    public async static Task<List<UserGroup>> GetAllUserGroups(int id_doorgroup, Supabase.Client client)
    {
        List<UserGroup> res = new List<UserGroup>();
        var inserted = await client.Postgrest.Table<DB.UserGroupDoorGroup>().Where(x => x.id_doorgroup == id_doorgroup).Get();
        foreach (DB.UserGroupDoorGroup rel in inserted.Models)
        {
            res.Add(await UserGroup.GetUsersById(rel.id_usergroup, client));
        }
        return res;
    }


    public static async Task<DoorGroups> GetGroupsById(int doorGroupId, Supabase.Client client)
    {
        ModeledResponse<DB.DoorGroups> doorGroupModel = await client.Postgrest.Table<DB.DoorGroups>()
            .Where(x => x.Id == doorGroupId)
            .Get();
        DB.DoorGroups l_doorGroups = doorGroupModel.Models.First();

        ModeledResponse<DB.DoorGroupDoor> doorGroupDoor = await client.Postgrest.Table<DB.DoorGroupDoor>()
            .Where(x => x.id_doorgroup == doorGroupId)
            .Get();

        IEnumerable<int> doorsIds = doorGroupDoor.Models.Where(x =>
            {
                if (!x.validity.HasValue) return true;
                return DateTime.Compare(x.validity.Value, DateTime.UtcNow) > 0;
            })
            .Select(x => x.id_door);

        DoorGroups group = new DoorGroups
        {
            Id = doorGroupId,
            ZoneName = l_doorGroups.ZoneName ?? "",
            CreatedAt = l_doorGroups.CreatedAt,
            Doors = doorsIds.ToList()
        };

        return group;
    }

    public static async Task<DoorGroups?> CreateDoorGroup(string name, Supabase.Client client)
    {
        var final_doorgroup = await client.Postgrest.Table<DB.DoorGroups> ().Where(x => x.ZoneName == name).Limit(1).Get();
        if (!final_doorgroup.Models.Any())
        {
            var new_doorgroup = new DB.DoorGroups();
            new_doorgroup.ZoneName = name;
            var res = await client.Postgrest.Table<DB.DoorGroups>().Insert(new_doorgroup);
            var up_doorgroup = res.Models.FirstOrDefault();
            await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, null, null, null, up_doorgroup.Id));
            return (await GetGroupsById(up_doorgroup.Id, client));
        }

        return null;
    }
    public static async Task<DoorGroups?> DeleteDoorGroup(int id_doorgroup, Supabase.Client client)
    {
        var final_doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Where(x => x.Id == id_doorgroup).Limit(1).Get();
        if (final_doorgroup.Models.Any())
        {
            var result = await GetGroupsById(id_doorgroup, client);
            var up_doorgroup = final_doorgroup.Models.FirstOrDefault();
            var res = await client.Postgrest.Table<DB.DoorGroups>().Delete(up_doorgroup);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, null, null, null, up_doorgroup.Id));
                return result;
            }
            return null;
        }

        return null;
    }

    public static async Task<DoorGroups?> UpdateDoorGroup(int id_doorgroup, string name, Supabase.Client client)
    {
        var final_doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Where(x => x.Id == id_doorgroup).Limit(1).Get();
        if (final_doorgroup.Models.Any())
        {
            var up_doorgroup = final_doorgroup.Models.FirstOrDefault();
            up_doorgroup.ZoneName = name;
            var res = await client.Postgrest.Table<DB.DoorGroups>().Update(up_doorgroup);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(2, null, null, null, up_doorgroup.Id));
                return (await GetGroupsById(id_doorgroup, client));
            }
            return null;
        }
        return null;
    }
}
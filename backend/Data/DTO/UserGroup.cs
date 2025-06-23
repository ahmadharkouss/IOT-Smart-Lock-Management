
using Episafe.DB;
using Postgrest.Responses;
using System.Text.Json.Serialization;
using static Postgrest.Constants;

namespace Episafe.Data.DTO;

public class UserGroup
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("users")]
    public List<int> Users { get; set; } = new List<int>();

    [JsonPropertyName("door_groups")]
    public List<int> door_groups { get; set; } = new List<int>();

    [JsonPropertyName("CreatedAt")]
    public DateTime CreatedAt { get; set; }

    public async static Task<List<UserGroup>> GetAllUserGroups(Supabase.Client client)
    {
        List<UserGroup> result = new List<UserGroup>();
        var usergroups = await client.Postgrest.Table<DB.UserGroups>().Get();
        foreach (DB.UserGroups usergroup in usergroups.Models)
        {
            UserGroup user_db = new UserGroup();
            user_db.Id = usergroup.Id;
            user_db.Name = usergroup.Name;
            user_db.CreatedAt = usergroup.CreatedAt;
            ModeledResponse<DB.UserGroupUser> userModels = await client.Postgrest.Table<DB.UserGroupUser>()
            .Filter(x => x.id_usergroup, Operator.Equals, usergroup.Id)
            .Get();
            IEnumerable<int> userIds = userModels.Models.Where(x =>
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
            }).Select(x => x.id_user);
            user_db.Users = userIds.ToList();

            ModeledResponse<DB.UserGroupDoorGroup> doorgroupModels = await client.Postgrest.Table<DB.UserGroupDoorGroup>()
            .Filter(x => x.id_usergroup, Operator.Equals, usergroup.Id)
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
            user_db.door_groups = doorgroupIds.ToList();

            result.Add(user_db);
        }
        return result;
    }

    public async static Task<List<int>> GetAllUserGroupIds(Supabase.Client client)
    {
        List<int> result = new List<int>();
        var usergroups = await client.Postgrest.Table<DB.UserGroups>().Get();
        foreach (DB.UserGroups usergroup in usergroups.Models)
        {
            result.Add(usergroup.Id);
        }
        return result;
    }

    public async static Task<UserGroup> GetUsersById(int User_group_id, Supabase.Client client)
    {
        ModeledResponse<DB.UserGroups>? userGroupModels = await client.Postgrest.Table<DB.UserGroups>().Filter(x => x.Id, Operator.Equals, User_group_id).Get();
        DB.UserGroups model = userGroupModels.Models.ElementAt(0);

        ModeledResponse<DB.UserGroupUser>? UGUModels = await client.Postgrest.Table<DB.UserGroupUser>()
            .Filter(x => x.id_usergroup, Operator.Equals, User_group_id)
            .Get();

        IEnumerable<int> userIds = UGUModels.Models.Where(x =>
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
        }).Select(x => x.id_user);


        ModeledResponse<DB.UserGroupDoorGroup>? UGDGModels = await client.Postgrest.Table<DB.UserGroupDoorGroup>()
            .Filter(x => x.id_usergroup, Operator.Equals, User_group_id)
            .Get();

        IEnumerable<int> doorGroupIds = UGDGModels.Models.Where(x =>
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


        UserGroup ext = new UserGroup();
        ext.Id = model.Id;
        ext.Name = model.Name;
        ext.CreatedAt = model.CreatedAt;
        ext.Users = userIds.ToList();
        ext.door_groups = doorGroupIds.ToList();

        return ext;
    }


    public static async Task<UserGroup?> CreateUserGroup(string name, Supabase.Client client)
    {
        var final_usergroup = await client.Postgrest.Table<DB.UserGroups>().Where(x => x.Name == name).Limit(1).Get();
        if (!final_usergroup.Models.Any())
        {
            var new_usergroup = new DB.UserGroups();
            new_usergroup.Name = name;
            var res = await client.Postgrest.Table<DB.UserGroups>().Insert(new_usergroup);
            var up_usergroup = res.Models.FirstOrDefault();
            await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, null, up_usergroup.Id, null, null));
            return (await GetUsersById(up_usergroup.Id, client));
        }

        return null;
    }

    public static async Task<UserGroup?> DeleteUserGroup(int id_usergroup, Supabase.Client client)
    {
        var final_usergroup = await client.Postgrest.Table<DB.UserGroups>().Where(x => x.Id == id_usergroup).Limit(1).Get();
        if (final_usergroup.Models.Any())
        {
            var result = await GetUsersById(id_usergroup, client);
            var up_usergroup = final_usergroup.Models.FirstOrDefault();
            var res = await client.Postgrest.Table<DB.UserGroups>().Delete(up_usergroup);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, null, id_usergroup, null, null));
                return result;
            }
            return null;
        }

        return null;
    }

    public static async Task<UserGroup?> UpdateUserGroup(int id_usergroup, string name, Supabase.Client client)
    {
        var final_usergroup = await client.Postgrest.Table<DB.UserGroups>().Where(x => x.Id == id_usergroup).Limit(1).Get();
        if (final_usergroup.Models.Any())
        {
            var up_usergroup = final_usergroup.Models.FirstOrDefault();
            up_usergroup.Name = name;
            var res = await client.Postgrest.Table<DB.UserGroups>().Update(up_usergroup);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(2, null, up_usergroup.Id, null, null));
                return (await GetUsersById(id_usergroup, client));
            }
            return null;
        }
        return null;
    }

    public static async Task<bool> AddToDoorGroup(int id_usergroup, int id_doorgroup, DateTime? validity, Supabase.Client client)
    {
        var final_usergroup = await client.Postgrest.Table<DB.UserGroups>().Where(x => x.Id == id_usergroup).Limit(1).Get();
        var final_doorgroup = await client.Postgrest.Table<DB.DoorGroups>().Where(x => x.Id == id_doorgroup).Limit(1).Get();
        var inserted = await client.Postgrest.Table<DB.UserGroupDoorGroup>().Where(x => x.id_doorgroup == id_doorgroup && x.id_usergroup == id_usergroup).Limit(1).Get();
        if (final_usergroup.Models.Any() && final_doorgroup.Models.Any() && !inserted.Models.Any())
        {
            var new_add = new DB.UserGroupDoorGroup();
            new_add.id_usergroup = id_usergroup;
            new_add.id_doorgroup = id_doorgroup;
            new_add.validity = validity;
            var res = await client.Postgrest.Table<DB.UserGroupDoorGroup>().Insert(new_add);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, null, id_usergroup, null, id_doorgroup));
                return true;
            }
            return false;
        }
        return false;
    }

    public static async Task<bool> RemoveFromDoorGroup(int id_usergroup, int id_doorgroup, Supabase.Client client)
    {
        var final_usergroupdoorgroup = await client.Postgrest.Table<DB.UserGroupDoorGroup>().Where(x => x.id_usergroup == id_usergroup && x.id_doorgroup == id_doorgroup).Limit(1).Get();
        if (final_usergroupdoorgroup.Models.Any())
        {
            var up_user = final_usergroupdoorgroup.Models.FirstOrDefault();
            var res = await client.Postgrest.Table<DB.UserGroupDoorGroup>().Delete(up_user);
            if (res.Models.Any())
            {
                await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, null, id_usergroup, null, id_doorgroup));
                return true;
            }
            return false;
        }
        return false;
    }
}
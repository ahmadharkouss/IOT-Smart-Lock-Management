
using System.Text.Json.Serialization;
using static Postgrest.Constants;
using Postgrest.Responses;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;
using System.Reflection;

namespace Episafe.Data.DTO
{
    public class Users
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("email")]
        public string Email { get; set; } = "";

        [JsonPropertyName("is_admin")]
        public bool IsAdmin { get; set; }

        [JsonPropertyName("user_groups")]
        public List<int> UserGroups { get; set; } = new List<int>();

        [JsonPropertyName("CreatedAt")]
        public DateTime CreatedAt { get; set; }

        public async static Task<List<Users>> GetAllUsers(Supabase.Client client)
        {
            List<Users> result = new List<Users>();
            var users = await client.Postgrest.Table<DB.Users>().Get();
            foreach(DB.Users user in users.Models)
            {
                Users user_db = new Users();
                user_db.Id = user.Id;
                user_db.Name = user.Name;
                user_db.Email = user.Email;
                user_db.IsAdmin = user.IsAdmin;
                user_db.CreatedAt = user.CreatedAt;

                ModeledResponse<DB.UserGroupUser>? userGroupModels = await client.Postgrest.Table<DB.UserGroupUser>()
                .Filter(x => x.id_user, Operator.Equals, user.Id)
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
                user_db.UserGroups = groupIds.ToList();
                result.Add(user_db);
            }
            return result;
        }
            public async static Task<Users> GetUsersById(int User_id, Supabase.Client client)
        {
            ModeledResponse<DB.Users>? userModels = await client.Postgrest.Table<DB.Users>().Filter(x => x.Id, Operator.Equals, User_id).Get();
            // Careful of the explosion if te id does not exist
            DB.Users model = userModels.Models.ElementAt(0);

            ModeledResponse<DB.UserGroupUser>? userGroupModels = await client.Postgrest.Table<DB.UserGroupUser>()
                .Filter(x => x.id_user, Operator.Equals, User_id)
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

            Users ext = new Users();

            ext.Id = User_id;
            ext.Name = model.Name ??  "";
            ext.Email = model.Email ?? "";
            ext.IsAdmin = model.IsAdmin;
            ext.CreatedAt = model.CreatedAt;
            ext.UserGroups = groupIds.ToList();

            return ext;
        }

        public async static Task<Users> CreateUser(string name, string email, bool is_admin, Supabase.Client client)
        {
            Users user = new Users();
            user.Name = name;
            user.Email = email;
            user.IsAdmin = is_admin;
            user.CreatedAt = DateTime.UtcNow;

            ModeledResponse<DB.Users>? userModel = await client.Postgrest.Table<DB.Users>().Insert(DB.Users.createUser(user));
            DB.Users model = userModel.Models.ElementAt(0);
            await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, model.Id, null, null, null));
            user.Id = model.Id;

            return user;
        }
        public static async Task<Users?> DeleteUser(int id_user, Supabase.Client client)
        {
            var final_user = await client.Postgrest.Table<DB.Users>().Where(x => x.Id == id_user).Limit(1).Get();
            if (final_user.Models.Any())
            {
                var result = await GetUsersById(id_user, client);
                var up_user = final_user.Models.FirstOrDefault();
                var res = await client.Postgrest.Table<DB.Users>().Delete(up_user);
                if (res.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, id_user, null, null, null));
                    return result;
                }
                return null;
            }

            return null;
        }

        public static async Task<Users?> UpdateUser(int id_user, string name, bool? isadmin, string? email, Supabase.Client client)
        {
            var final_user = await client.Postgrest.Table<DB.Users>().Where(x => x.Id == id_user).Limit(1).Get();
            if (final_user.Models.Any())
            {
                var up_user = final_user.Models.FirstOrDefault();
                up_user.Name = name;
                up_user.IsAdmin = (bool)isadmin;
                up_user.Email = email;
                var res = await client.Postgrest.Table<DB.Users>().Update(up_user);
                if (res.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(2, id_user, null, null, null));
                    return (await GetUsersById(id_user, client));
                }
                return null;
            }
            return null;
        }

        public static async Task<bool> AddToUserGroup(int id_user, int id_usergroup, DateTime? validity, Supabase.Client client)
        {
            var final_user = await client.Postgrest.Table<DB.Users>().Where(x => x.Id == id_user).Limit(1).Get();
            var final_usergroup = await client.Postgrest.Table<DB.UserGroups>().Where(x => x.Id == id_usergroup).Limit(1).Get();
            var inserted = await client.Postgrest.Table<DB.UserGroupUser>().Where(x => x.id_user == id_user && x.id_usergroup == id_usergroup).Limit(1).Get();
            if (final_user.Models.Any() && final_usergroup.Models.Any() && !inserted.Models.Any())
            {
                var new_add = new DB.UserGroupUser();
                new_add.id_user = id_user;
                new_add.id_usergroup = id_usergroup;
                new_add.validity = validity;
                var res = await client.Postgrest.Table<DB.UserGroupUser>().Insert(new_add);
                if (res.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(0, id_user, id_usergroup, null, null));
                    return true;
                }
                return false;
            }
            return false;
        }

        public static async Task<bool> RemoveFromUserGroup(int id_user, int id_usergroup, Supabase.Client client)
        {
            var final_usergroupuser = await client.Postgrest.Table<DB.UserGroupUser>().Where(x => x.id_user == id_user && x.id_usergroup == id_usergroup).Limit(1).Get();
            if (final_usergroupuser.Models.Any())
            {
                var up_user = final_usergroupuser.Models.FirstOrDefault();
                var res = await client.Postgrest.Table<DB.UserGroupUser>().Delete(up_user);
                if (res.Models.Any())
                {
                    await client.Postgrest.Table<DB.Logs>().Insert(DB.Logs.createLog(1, id_user, id_usergroup, null, null));
                    return true;
                }
                return false;
            }
            return false;
        }

        public async static Task<bool> Open(int id, Supabase.Client client)
        {
            var result = await client.Postgrest.Table<DB.Users>().Where(x => x.Id == id && x.IsAdmin == true).Get();
            return result.Models.Any();
        }
    }
}

using Episafe.Engine.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;
using System.Text.Json.Serialization;
using Episafe.Data.DTO;
using static Postgrest.Constants;

namespace Episafe.Controllers
{
    [ApiController]
    [Route("admin")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class FrontendController : ControllerBase
    {
        /// <summary>
        /// Get User encoded informations (name, email, is_admin)
        /// </summary>
        /// <param name="id_user"></param>
        /// <returns></returns>
        [HttpGet("user/all")]
        public async Task<List<Users>> GetAllUsers()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var user = await Users.GetAllUsers(client);

            if (user == null)
                throw new HttpFordidenException("Can't get user");

            return (user);
        }

        /// <summary>
        /// Get User encoded informations (name, email, is_admin)
        /// </summary>
        /// <param name="id_user"></param>
        /// <returns></returns>
        [HttpGet("user/{id_user}")]
        public async Task<Users> GetUserInfos(int id_user)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var user = await Users.GetUsersById(id_user, client);

            if (user == null)
                throw new HttpFordidenException("Can't get user");

            return (user);
        }
        public class UserBodyPost
        {
            [JsonPropertyName("name")]
            public string Name { get; set; }
            [JsonPropertyName("isadmin")]
            public bool IsAdmin { get; set; }
            [JsonPropertyName("email")]
            public string Email { get; set; }
        }

        /// <summary>
        /// Create User
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("user")]
        public async Task<Users> CreateUser([FromBody] UserBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var new_user = await Users.CreateUser(obj.Name, obj.Email, obj.IsAdmin, client);

            if (new_user == null)
                throw new HttpFordidenException("Can't create users");

            return (new_user);
        }

        /// <summary>
        /// Delete User
        /// </summary>
        /// <param name="id_user"></param>
        /// <returns></returns>
        [HttpDelete("user/{id_user}")]
        public async Task<Users> DeleteUser(int id_user)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var user = await Users.DeleteUser(id_user, client);

            if (user == null)
                throw new HttpFordidenException("Can't delete user");

            return (user);
        }

        /// <summary>
        /// Update User
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPatch("user")]
        public async Task<Users> UpdateUser([FromBody] UpdatePost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var user = await Users.UpdateUser(obj.Id, obj.Name, obj.IsAdmin, obj.Email, client);

            if (user == null)
                throw new HttpFordidenException("Can't update user");

            return (user);
        }

        [HttpGet("usergroup/all")]
        public async Task<List<UserGroup>> GetAllUserGroups()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.GetAllUserGroups(client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't get user");

            return (usergroup);
        }

        [HttpGet("usergroup/allid")]
        public async Task<List<int>> GetAllUserGroupIds()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.GetAllUserGroupIds(client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't get user");

            return (usergroup);
        }

        /// <summary>
        /// Get UserGroup encoded informations (name)
        /// </summary>
        /// <param name="id_usergroup"></param>
        /// <returns></returns>
        [HttpGet("usergroup/{id_usergroup}")]
        public async Task<UserGroup> GetUserGroupInfos(int id_usergroup)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.GetUsersById(id_usergroup, client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't get usergroup");

            return (usergroup);
        }

        public class BasicBodyPost
        {
            [JsonPropertyName("name")]
            public string Name { get; set; }
        }

        /// <summary>
        /// Create UserGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("usergroup")]
        public async Task<UserGroup> CreateUserGroup([FromBody] BasicBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.CreateUserGroup(obj.Name, client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't create usergroup");

            return (usergroup);
        }

        /// <summary>
        /// Delete UserGroup
        /// </summary>
        /// <param name="id_usergroup"></param>
        /// <returns></returns>
        [HttpDelete("usergroup/{id_usergroup}")]
        public async Task<UserGroup> DeleteUserGroup(int id_usergroup)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.DeleteUserGroup(id_usergroup, client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't delete usergroup");

            return (usergroup);
        }

        /// <summary>
        /// Update UserGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPatch("usergroup")]
        public async Task<UserGroup> UpdateUserGroup([FromBody] UpdatePost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var usergroup = await UserGroup.UpdateUserGroup(obj.Id, obj.Name, client);

            if (usergroup == null)
                throw new HttpFordidenException("Can't update usergroup");

            return (usergroup);
        }

        [HttpGet("door/all")]
        public async Task<List<Doors>> GetAllDoors()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doors = await Doors.GetAllDoors(client);

            if (doors == null)
                throw new HttpFordidenException("Can't get user");

            return (doors);
        }

        /// <summary>
        /// Get Door encoded informations (name)
        /// </summary>
        /// <param name="id_door"></param>
        /// <returns></returns>
        [HttpGet("door/{id_door}")]
        public async Task<Doors> GetDoorInfos(int id_door)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var door = await Doors.GetDoorById(id_door, client);

            if (door == null)
                throw new HttpFordidenException("Can't get door");

            return (door);
        }

        /// <summary>
        /// Create Door
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("door")]
        public async Task<Doors> CreateDoor([FromBody] BasicBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");
            var door = await Doors.CreateDoor(obj.Name, client);

            if (door == null)
                throw new HttpFordidenException("Can't create door");

            return (door);
        }

        /// <summary>
        /// Delete Door
        /// </summary>
        /// <param name="id_door"></param>
        /// <returns></returns>
        [HttpDelete("door/{id_door}")]
        public async Task<Doors> DeleteDoor(int id_door)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var door = await Doors.DeleteDoor(id_door, client);

            if (door == null)
                throw new HttpFordidenException("Can't delete door");

            return (door);
        }

        public class UpdatePost
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }
            [JsonPropertyName("name")]
            public string Name { get; set; }
            [JsonPropertyName("isadmin")]
            public bool? IsAdmin { get; set; }
            [JsonPropertyName("email")]
            public string? Email { get; set; }
        }

        /// <summary>
        /// Update Door
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPatch("door")]
        public async Task<Doors> UpdateDoor([FromBody] UpdatePost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var door = await Doors.UpdateDoor(obj.Id, obj.Name, client);

            if (door == null)
                throw new HttpFordidenException("Can't update door");

            return (door);
        }

        [HttpGet("doorgroup/all")]
        public async Task<List<DoorGroups>> GetAllDoorGroups()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroups = await DoorGroups.GetAllDoorGroups(client);

            if (doorgroups == null)
                throw new HttpFordidenException("Can't get user");

            return (doorgroups);
        }

        [HttpGet("doorgroup/allids")]
        public async Task<List<int>> GetAllDoorGroupIds()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroups = await DoorGroups.GetAllDoorGroupIds(client);

            if (doorgroups == null)
                throw new HttpFordidenException("Can't get user");

            return (doorgroups);
        }

        [HttpGet("usergroupdoorgroup/{door_groupID}")]
        public async Task<List<UserGroup>> GetAllUserGroupIds(int door_groupID)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroups = await DoorGroups.GetAllUserGroups(door_groupID, client);

            if (doorgroups == null)
                throw new HttpFordidenException("Can't get user");

            return (doorgroups);
        }

        /// <summary>
        /// Get DoorGroup encoded informations (name)
        /// </summary>
        /// <param name="id_doorgroup"></param>
        /// <returns></returns>
        [HttpGet("doorgroup/{id_doorgroup}")]
        public async Task<DoorGroups> GetDoorGroupInfos(int id_doorgroup)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroup = await DoorGroups.GetGroupsById(id_doorgroup, client);

            if (doorgroup == null)
                throw new HttpFordidenException("Can't get doorgroup");

            return (doorgroup);
        }

        /// <summary>
        /// Create DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("doorgroup")]
        public async Task<DoorGroups> CreateDoorGroup([FromBody] BasicBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroup = await DoorGroups.CreateDoorGroup(obj.Name, client);

            if (doorgroup == null)
                throw new HttpFordidenException("Can't create doorgroup");

            return (doorgroup);
        }

        /// <summary>
        /// Delete DoorGroup
        /// </summary>
        /// <param name="id_doorgroup"></param>
        /// <returns></returns>
        [HttpDelete("doorgroup/{id_doorgroup}")]
        public async Task<DoorGroups> DeleteDoorGroup(int id_doorgroup)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroup = await DoorGroups.DeleteDoorGroup(id_doorgroup, client);

            if (doorgroup == null)
                throw new HttpFordidenException("Can't delete doorgroup");

            return (doorgroup);
        }

        /// <summary>
        /// Update DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPatch("doorgroup")]
        public async Task<DoorGroups> UpdateDoorGroup([FromBody] UpdatePost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var doorgroup = await DoorGroups.UpdateDoorGroup(obj.Id, obj.Name, client);

            if (doorgroup == null)
                throw new HttpFordidenException("Can't update doorgroup");

            return (doorgroup);
        }
        public class AddUserBodyPost
        {
            [JsonPropertyName("id_user")]
            public int Id_User { get; set; }
            [JsonPropertyName("id_usergroup")]
            public int Id_UserGroup { get; set; }
            [JsonPropertyName("validity")]
            public DateTime? Validity { get; set; }
        }

        /// <summary>
        /// Add User to a UserGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("usergroupuser")]
        public async Task<bool> AddUserToUserGroup([FromBody] AddUserBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Users.AddToUserGroup(obj.Id_User, obj.Id_UserGroup, obj.Validity, client);

            return (result);
        }

        public class AddDoorBodyPost
        {
            [JsonPropertyName("id_door")]
            public int Id_Door { get; set; }
            [JsonPropertyName("id_doorgroup")]
            public int Id_DoorGroup { get; set; }
            [JsonPropertyName("validity")]
            public DateTime? Validity { get; set; }
        }

        /// <summary>
        /// Add Door to a DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("doorgroupdoor")]
        public async Task<bool> AddDoorToDoorGroup([FromBody] AddDoorBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Doors.AddToDoorGroup(obj.Id_Door, obj.Id_DoorGroup, obj.Validity, client);

            return (result);
        }

        public class AddUserGroupBodyPost
        {
            [JsonPropertyName("id_usergroup")]
            public int Id_UserGroup { get; set; }
            [JsonPropertyName("id_doorgroup")]
            public int Id_DoorGroup { get; set; }
            [JsonPropertyName("validity")]
            public DateTime? Validity { get; set; }
        }

        /// <summary>
        /// Add UserGroup to a DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("usergroupdoorgroup")]
        public async Task<bool> AddUserGroupToDoorGroup([FromBody] AddUserGroupBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await UserGroup.AddToDoorGroup(obj.Id_UserGroup, obj.Id_DoorGroup, obj.Validity, client);

            return (result);
        }

        /// <summary>
        /// Remove User from a UserGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpDelete("usergroupuser")]
        public async Task<bool> RemoveUserToUserGroup([FromBody] AddUserBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Users.RemoveFromUserGroup(obj.Id_User, obj.Id_UserGroup, client);

            return (result);
        }

        /// <summary>
        /// Remove Door from a DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpDelete("doorgroupdoor")]
        public async Task<bool> RemoveDoortoDoorGroup([FromBody] AddDoorBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Doors.RemoveFromDoorGroup(obj.Id_Door, obj.Id_DoorGroup, client);

            return (result);
        }

        /// <summary>
        /// Remove UserGroup from a DoorGroup
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpDelete("usergroupdoorgroup")]
        public async Task<bool> RemoveUserGrouptoDoorGroup([FromBody] AddUserGroupBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await UserGroup.RemoveFromDoorGroup(obj.Id_UserGroup, obj.Id_DoorGroup, client);

            return (result);
        }
    }
}
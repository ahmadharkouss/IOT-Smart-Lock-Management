using Episafe.Engine.Exceptions;
using Microsoft.AspNetCore.Mvc;
using static Episafe.Controllers.OpenController;
using System.Text.Json.Serialization;
using Episafe.Data.DTO;

namespace Episafe.Controllers
{
    [ApiController]
    [Route("keycloak")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class KeycloakController : ControllerBase
    {

        public class CreateBodyPost
        {
            [JsonPropertyName("username")]
            public string Username { get; set; }
            [JsonPropertyName("email")]
            public string Email { get; set; }
        }


        /// <summary>
        /// Create into database keycloak
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public async Task<Keycloak> CreateKeycloakUser([FromBody] CreateBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Keycloak.CreateUser(obj.Username, obj.Email, client);
            return result;
        }


        /// <summary>
        /// Check if open
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("open/{id_user}")]
        public async Task<bool> OpenDoor(int id_user)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Users.Open(id_user, client);
            return result;
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("delee/{id_user}")]
        public async Task<bool> DeleteDoor(int id_user)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Keycloak.Delete(id_user, client);
            return result;
        }
    }
}

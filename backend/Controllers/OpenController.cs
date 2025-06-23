
using Episafe.Engine.Exceptions;
using Episafe.Engine.ActionFilters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.ComponentModel.Design;
using System.Text.Json.Serialization;
using Episafe.Data.DTO;

namespace Episafe.Controllers
{
    [ApiController]
    [Route("open")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class OpenController : ControllerBase
    {
        public class OpenBodyPost
        {
            [JsonPropertyName("id_user")]
            public int Id_User { get; set; }
            [JsonPropertyName("id_door")]
            public int Id_Door { get; set; }
        }

        /// <summary>
        /// Trying to open a door with user
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("door")]
        public async Task<bool> OpenDoor([FromBody] OpenBodyPost obj)
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Doors.Open(obj.Id_User, obj.Id_Door, client);
            return result;
        }

    }
}

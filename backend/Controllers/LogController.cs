
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
    [Route("logs")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class LogsController : ControllerBase
    {
        /// <summary>
        /// Get All Logs
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpGet("all")]
        public async Task<List<Logs>> GetAllLogs()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Logs.GetAllLogs(client);
            return result;
        }

        /// <summary>
        /// Get All Logs
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost("delete")]
        public async Task<bool> GetDeleteAll()
        {
            var client = await this.GetSupabaseClient();
            if (client == null)
                throw new HttpInternalServerException("Cannot connect to Supabase :(");

            var result = await Logs.DeleteAll(client);
            return result;
        }
    }
}

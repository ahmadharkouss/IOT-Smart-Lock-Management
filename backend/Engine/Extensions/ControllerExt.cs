
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Postgrest.Models;
using Postgrest.Responses;
using Supabase;
using System.Linq;
using System.Transactions;

namespace Episafe
{
    public static class ControllerExt
    {

        public static bool IsSucess<T>(this ModeledResponse<T> model) where T : BaseModel, new()
        {
            if (model == null)
                return (false);

            return (model.ResponseMessage != null && model.ResponseMessage.StatusCode == System.Net.HttpStatusCode.OK);
        }

        public static string? GetJWT(this ControllerBase controller)
        {
            if (controller == null)
                return (null);

            if (controller.HttpContext.Request.Headers.ContainsKey("Authorization"))
                return controller.HttpContext.Request.Headers["Authorization"].ElementAt(0);

            return (null);
        }

        public static async Task<Supabase.Client?> GetSupabaseClient(this ControllerBase controller)
        {
            var services = controller.HttpContext.RequestServices;
            if (services == null)
                return (null);

            var client = (services.GetService(typeof(Supabase.Client)) as Supabase.Client);
            /* if (client != null)
            {
                client.Auth.Options.Headers.Add("Authorization", $"Bearer {jwt}");
                client.Postgrest.Options.Headers.Add("Authorization", $"Bearer {jwt}");
                client.Realtime.Options.Headers.Add("Authorization", $"Bearer {jwt}");
                client.Storage.Headers.Add("Authorization", $"Bearer {jwt}");
            } */

            return (client);
        }
    }
}

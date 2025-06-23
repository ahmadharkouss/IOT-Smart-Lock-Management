using Postgrest.Responses;
using System.Text;
using System.Text.Json.Serialization;
using System.Xml.Linq;
using static Postgrest.Constants;

namespace Episafe.Data.DTO
{
    public class Keycloak
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        public async static Task<Keycloak?> CreateUser(string username, string email, Supabase.Client client)
        {
            return null;
        }

        public async static Task<bool> Delete(int id, Supabase.Client client)
        {
            return true;
        }
    }
}

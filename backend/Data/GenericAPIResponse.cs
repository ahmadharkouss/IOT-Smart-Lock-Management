using System.Text.Json.Serialization;

namespace Episafe.Data
{
    public class GenericAPIResponse<T>
    {
        [JsonPropertyName("code")]
        public int Code { get; set; } = 200;

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("data")]
        public T Value { get; set; }

        public GenericAPIResponse(T value, string description, int code = 200)
        {
            this.Code = code;
            this.Value = value;
            this.Description = description;
        }
    }
}

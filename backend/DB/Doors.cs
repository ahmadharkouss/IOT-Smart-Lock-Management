using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("doors")]
    public class Doors : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

        [Column("name")]
        public string? Name { get; set; }

    }
}

using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("doorgroups")]
    public class DoorGroups : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

        [Column("zoneName")]
        public string? ZoneName { get; set; }

    }
}

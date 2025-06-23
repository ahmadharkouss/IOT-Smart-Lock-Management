using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("usergroups")]
    public class UserGroups : BaseModel
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

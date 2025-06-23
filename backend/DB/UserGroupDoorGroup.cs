using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("usergroupdoorgroup")]
    public class UserGroupDoorGroup : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("id_doorgroup")]
        public int id_doorgroup { get; set; }

        [Column("id_usergroup")]
        public int id_usergroup { get; set; }

        [Column("validity")]
        public DateTime? validity { get; set; }
    }
}

using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("usergroupuser")]
    public class UserGroupUser : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("id_usergroup")]
        public int id_usergroup { get; set; }

        [Column("id_user")]
        public int id_user { get; set; }

        [Column("validity")]
        public DateTime? validity { get; set; }
        
    }
}

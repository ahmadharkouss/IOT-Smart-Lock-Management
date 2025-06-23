using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("logs")]
    public class Logs : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("timestamp")]
        public DateTime? Timestamp { get; set; }
        = DateTime.UtcNow;

        [Column("type")]
        public int Type { get; set; }
        [Column("user")]
        public int? UserId { get; set; }
        [Column("usergroup")]
        public int? UserGroupId { get; set; }

        [Column("door")]
        public int? DoorId { get; set; }

        [Column("doorgroup")]
        public int? DoorGroupId { get; set; }

        public static Logs createLog(int type, int? userid, int? usergroupid, int? doorid, int? doorgroupid)
        {
            Logs ext = new Logs();
            ext.Type = type;
            ext.UserId = userid;
            ext.UserGroupId = usergroupid;
            ext.DoorId = doorid;
            ext.DoorGroupId = doorgroupid;
            return ext;

        }
    }
}
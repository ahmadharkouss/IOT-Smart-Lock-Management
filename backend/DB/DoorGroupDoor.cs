using Postgrest.Attributes;
using Postgrest.Models;
using System.Reactive;

namespace Episafe.DB
{
    [Table("doorgroupdoor")]
    public class DoorGroupDoor : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("id_doorgroup")]
        public int id_doorgroup { get; set; }

        [Column("id_door")]
        public int id_door { get; set; }

        [Column("validity")]
        public DateTime? validity { get; set; }
    }
}

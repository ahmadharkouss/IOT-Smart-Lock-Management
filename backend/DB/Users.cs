using Postgrest.Attributes;
using Postgrest.Models;

namespace Episafe.DB
{
    [Table("users")]
    public class Users : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

        [Column("name")]
        public string? Name { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("is_admin")]
        public bool IsAdmin { get; set; }

        public static Users createUser(Data.DTO.Users user)
        {
            Users ext = new Users();
            ext.CreatedAt = user.CreatedAt;
            ext.Name = user.Name;
            ext.Email = user.Email;
            ext.IsAdmin = user.IsAdmin;
            return ext;

        }

    }
}

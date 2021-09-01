
using System.ComponentModel.DataAnnotations;

namespace server.Models.Database;
public class DatabaseGame
{
    public DatabaseGame() { }
    public DatabaseGame(string name, bool isPrivate, DatabaseUser owner)
    {
        Name = name;
        IsPrivate = isPrivate;
        Owner = owner;
    }
    [Required]
    public string Name {  get; set; }
    [Key]
    public int  Id {  get; set; }
    [Required]
    public bool IsPrivate {  get; set; }
    [Required]
    public virtual DatabaseUser Owner {  get; set; }

}

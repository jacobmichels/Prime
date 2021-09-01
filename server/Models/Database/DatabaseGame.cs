
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
        Id = Guid.NewGuid();
        Players = new List<DatabaseUser>();
    }
    [Required]
    public string Name {  get; set; }
    [Key]
    public Guid Id {  get; set; }
    [Required]
    public bool IsPrivate {  get; set; }
    [Required]
    public virtual DatabaseUser Owner {  get; set; }
    [Required]
    public virtual List<DatabaseUser> Players {  get; set; }

}

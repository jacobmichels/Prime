using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.DataAccess
{
    public class PrimeContext: DbContext
    {
        public DbSet<DatabaseUser> Users { get; set; }

        public PrimeContext(DbContextOptions<PrimeContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DatabaseUser>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
            });
        }
    }
    
    
}
using challenge.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace challenge.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("Person");

            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            ChangeTracker.Entries()
                .Where(entry =>
                    entry.Entity is Person &&
                    entry.State == EntityState.Added)
                .ToList();


            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
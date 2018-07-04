using Microsoft.EntityFrameworkCore;
// using server.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace challenge.Data
{
    public class ApplicationDbContext : DbContext
    {
        // public DbSet<Customer> Customers { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Customer>().ToTable("Customer");

            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {

            //  ChangeTracker.Entries()
            //  .Where(entry =>
            //    entry.Entity is Agreement &&
            //    entry.State == EntityState.Added)
            //  .ToList()
            //  .ForEach(entry =>
            //  {
            //      if (entry.Reference(nameof(Agreement.Payment)).CurrentValue == null)
            //          entry.Reference(nameof(Agreement.Payment)).CurrentValue = new PaymentInfo();
            //  });


            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
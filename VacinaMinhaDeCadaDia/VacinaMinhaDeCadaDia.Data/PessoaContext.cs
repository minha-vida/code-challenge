using Microsoft.EntityFrameworkCore;
using System;
using VacinaMinhaDeCadaDia.Domain.Entidades;

namespace VacinaMinhaDeCadaDia.Data
{
    public class PessoaContext : DbContext
    {
        public PessoaContext(DbContextOptions<PessoaContext> opcoes) : base(opcoes) { }

        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Vacina> Vacina { get; set; }
        public DbSet<PessoaVacina> PessoaVacina { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PessoaVacina>().HasKey(s => new { s.IdPessoa, s.IdVacina });
        }
    }
}

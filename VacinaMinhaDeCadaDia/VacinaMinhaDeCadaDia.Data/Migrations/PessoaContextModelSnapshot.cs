﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using VacinaMinhaDeCadaDia.Data;

namespace VacinaMinhaDeCadaDia.Data.Migrations
{
    [DbContext(typeof(PessoaContext))]
    partial class PessoaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VacinaMinhaDeCadaDia.Domain.Entidades.Pessoa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Foto");

                    b.Property<int>("Idade");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.ToTable("Pessoa");
                });

            modelBuilder.Entity("VacinaMinhaDeCadaDia.Domain.Entidades.PessoaVacina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataDeAplicacao");

                    b.Property<int?>("PessoaId");

                    b.Property<int?>("VacinaId");

                    b.HasKey("Id");

                    b.HasIndex("PessoaId");

                    b.HasIndex("VacinaId");

                    b.ToTable("PessoaVacina");
                });

            modelBuilder.Entity("VacinaMinhaDeCadaDia.Domain.Entidades.Vacina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AlteradaEm");

                    b.Property<DateTime>("CriadaEm");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.ToTable("Vacina");
                });

            modelBuilder.Entity("VacinaMinhaDeCadaDia.Domain.Entidades.PessoaVacina", b =>
                {
                    b.HasOne("VacinaMinhaDeCadaDia.Domain.Entidades.Pessoa", "Pessoa")
                        .WithMany("Vacinas")
                        .HasForeignKey("PessoaId");

                    b.HasOne("VacinaMinhaDeCadaDia.Domain.Entidades.Vacina", "Vacina")
                        .WithMany("Pessoas")
                        .HasForeignKey("VacinaId");
                });
#pragma warning restore 612, 618
        }
    }
}
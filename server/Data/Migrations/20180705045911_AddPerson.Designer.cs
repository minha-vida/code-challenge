﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Data;

namespace server.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180705045911_AddPerson")]
    partial class AddPerson
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("server.Models.Person", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Age");

                    b.Property<string>("Name");

                    b.Property<string>("Photo");

                    b.HasKey("Id");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("server.Models.Vaccine", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<Guid?>("PersonId");

                    b.Property<DateTime>("appliedAt");

                    b.Property<DateTime>("createdAt");

                    b.Property<DateTime>("updatedAt");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Vaccine");
                });

            modelBuilder.Entity("server.Models.Vaccine", b =>
                {
                    b.HasOne("server.Models.Person")
                        .WithMany("Vaccines")
                        .HasForeignKey("PersonId");
                });
#pragma warning restore 612, 618
        }
    }
}

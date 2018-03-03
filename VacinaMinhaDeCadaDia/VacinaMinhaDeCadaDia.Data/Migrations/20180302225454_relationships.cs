using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace VacinaMinhaDeCadaDia.Data.Migrations
{
    public partial class relationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacina_Pessoa_PessoaId",
                table: "Vacina");

            migrationBuilder.DropIndex(
                name: "IX_Vacina_PessoaId",
                table: "Vacina");

            migrationBuilder.DropColumn(
                name: "AplicadaEm",
                table: "Vacina");

            migrationBuilder.DropColumn(
                name: "PessoaId",
                table: "Vacina");

            migrationBuilder.CreateTable(
                name: "PessoaVacina",
                columns: table => new
                {
                    IdPessoa = table.Column<int>(nullable: false),
                    IdVacina = table.Column<int>(nullable: false),
                    DataDeAplicacao = table.Column<DateTime>(nullable: false),
                    PessoaId = table.Column<int>(nullable: true),
                    VacinaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PessoaVacina", x => new { x.IdPessoa, x.IdVacina });
                    table.ForeignKey(
                        name: "FK_PessoaVacina_Pessoa_PessoaId",
                        column: x => x.PessoaId,
                        principalTable: "Pessoa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PessoaVacina_Vacina_VacinaId",
                        column: x => x.VacinaId,
                        principalTable: "Vacina",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PessoaVacina_PessoaId",
                table: "PessoaVacina",
                column: "PessoaId");

            migrationBuilder.CreateIndex(
                name: "IX_PessoaVacina_VacinaId",
                table: "PessoaVacina",
                column: "VacinaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PessoaVacina");

            migrationBuilder.AddColumn<DateTime>(
                name: "AplicadaEm",
                table: "Vacina",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PessoaId",
                table: "Vacina",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vacina_PessoaId",
                table: "Vacina",
                column: "PessoaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacina_Pessoa_PessoaId",
                table: "Vacina",
                column: "PessoaId",
                principalTable: "Pessoa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

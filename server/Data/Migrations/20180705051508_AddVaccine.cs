using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Data.Migrations
{
    public partial class AddVaccine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "updatedAt",
                table: "Vaccine",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Vaccine",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "appliedAt",
                table: "Vaccine",
                newName: "AppliedAt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Vaccine",
                newName: "updatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Vaccine",
                newName: "createdAt");

            migrationBuilder.RenameColumn(
                name: "AppliedAt",
                table: "Vaccine",
                newName: "appliedAt");
        }
    }
}

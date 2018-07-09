using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Data.Migrations
{
    public partial class CascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccine_Person_PersonId",
                table: "Vaccine");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccine_Person_PersonId",
                table: "Vaccine",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccine_Person_PersonId",
                table: "Vaccine");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccine_Person_PersonId",
                table: "Vaccine",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

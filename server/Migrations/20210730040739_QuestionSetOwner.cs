using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class QuestionSetOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "QuestionSets",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuestionSets_OwnerId",
                table: "QuestionSets",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionSets_Users_OwnerId",
                table: "QuestionSets",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionSets_Users_OwnerId",
                table: "QuestionSets");

            migrationBuilder.DropIndex(
                name: "IX_QuestionSets_OwnerId",
                table: "QuestionSets");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "QuestionSets");
        }
    }
}

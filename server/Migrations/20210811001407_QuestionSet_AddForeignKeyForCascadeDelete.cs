using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class QuestionSet_AddForeignKeyForCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionSets_DatabaseQuestionSetId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "DatabaseQuestionSetId",
                table: "Questions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionSets_DatabaseQuestionSetId",
                table: "Questions",
                column: "DatabaseQuestionSetId",
                principalTable: "QuestionSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionSets_DatabaseQuestionSetId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "DatabaseQuestionSetId",
                table: "Questions",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionSets_DatabaseQuestionSetId",
                table: "Questions",
                column: "DatabaseQuestionSetId",
                principalTable: "QuestionSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

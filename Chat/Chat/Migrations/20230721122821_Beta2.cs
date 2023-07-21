using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chat.Migrations
{
    /// <inheritdoc />
    public partial class Beta2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlackCart");

            migrationBuilder.DropIndex(
                name: "IX_FriendList_UserId",
                table: "FriendList");

            migrationBuilder.AddColumn<int>(
                name: "FriendId",
                table: "FriendList",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "FriendList",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FriendList_UserId",
                table: "FriendList",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FriendList_UserId",
                table: "FriendList");

            migrationBuilder.DropColumn(
                name: "FriendId",
                table: "FriendList");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "FriendList");

            migrationBuilder.CreateTable(
                name: "BlackCart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlackCart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlackCart_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendList_UserId",
                table: "FriendList",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BlackCart_UserId",
                table: "BlackCart",
                column: "UserId",
                unique: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServicioProductosSOA.Migrations
{
    /// <inheritdoc />
    public partial class NombreMigracion3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_producto_id_tipo",
                table: "producto",
                column: "id_tipo");

            migrationBuilder.AddForeignKey(
                name: "fk_producto_tipo_producto",
                table: "producto",
                column: "id_tipo",
                principalTable: "tipo_producto",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_producto_tipo_producto",
                table: "producto");

            migrationBuilder.DropIndex(
                name: "IX_producto_id_tipo",
                table: "producto");
        }
    }
}

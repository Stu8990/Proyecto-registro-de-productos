using Microsoft.EntityFrameworkCore;
using ServicioProductosSOA.Models;

namespace ServicioProductosSOA.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<TipoProducto> TiposProducto { get; set; }
    public DbSet<Producto> Productos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TipoProducto>().ToTable("tipo_producto");
        modelBuilder.Entity<TipoProducto>().Property(t => t.Id).HasColumnName("id");
        modelBuilder.Entity<TipoProducto>().Property(t => t.Tipo).HasColumnName("tipo");

        modelBuilder.Entity<Producto>().ToTable("producto");
        modelBuilder.Entity<Producto>().Property(p => p.Id).HasColumnName("id");
        modelBuilder.Entity<Producto>().Property(p => p.IdTipo).HasColumnName("id_tipo");
        modelBuilder.Entity<Producto>().Property(p => p.Descripcion).HasColumnName("descripcion");
        modelBuilder.Entity<Producto>().Property(p => p.Valor).HasColumnName("valor");
        modelBuilder.Entity<Producto>().Property(p => p.Costo).HasColumnName("costo");
    }
}

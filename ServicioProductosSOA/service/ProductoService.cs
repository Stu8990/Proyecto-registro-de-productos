using ServicioProductosSOA.Data;
using ServicioProductosSOA.Models;

namespace ServicioProductosSOA.Services;

public class ProductoService : IProductoService
{
    private readonly AppDbContext _context;

    public ProductoService(AppDbContext context)
    {
        _context = context;
    }

    public List<Producto> ListarProductos()
    {
        return _context.Productos.ToList();
    }

    public Producto ObtenerProducto(int id)
    {
        return _context.Productos.Find(id);
    }

    public void InsertarProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        _context.SaveChanges();
    }

    public void ActualizarProducto(Producto producto)
    {
        _context.Productos.Update(producto);
        _context.SaveChanges();
    }

    public void EliminarProducto(int id)
    {
        var producto = _context.Productos.Find(id);
        if (producto != null)
        {
            _context.Productos.Remove(producto);
            _context.SaveChanges();
        }
    }
}

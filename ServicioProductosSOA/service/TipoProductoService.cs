using ServicioProductosSOA.Data;
using ServicioProductosSOA.Models;

namespace ServicioProductosSOA.Services;

public class TipoProductoService : ITipoProductoService
{
    private readonly AppDbContext _context;

    public TipoProductoService(AppDbContext context)
    {
        _context = context;
    }

    public List<TipoProducto> ListarTiposProducto()
    {
        return _context.TiposProducto.ToList();
    }

    public TipoProducto ObtenerTipoProducto(int id)
    {
        return _context.TiposProducto.Find(id);
    }

    public void InsertarTipoProducto(TipoProducto tipoProducto)
    {
        _context.TiposProducto.Add(tipoProducto);
        _context.SaveChanges();
    }

    public void ActualizarTipoProducto(TipoProducto tipoProducto)
    {
        _context.TiposProducto.Update(tipoProducto);
        _context.SaveChanges();
    }

    public void EliminarTipoProducto(int id)
    {
        var tipoProducto = _context.TiposProducto.Find(id);
        if (tipoProducto != null)
        {
            _context.TiposProducto.Remove(tipoProducto);
            _context.SaveChanges();
        }
    }
}

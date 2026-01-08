using CoreWCF;
using ServicioProductosSOA.Models;

namespace ServicioProductosSOA.Services;

[ServiceContract]
public interface IProductoService
{
    [OperationContract]
    List<Producto> ListarProductos();

    [OperationContract]
    Producto ObtenerProducto(int id);

    [OperationContract]
    void InsertarProducto(Producto producto);

    [OperationContract]
    void ActualizarProducto(Producto producto);

    [OperationContract]
    void EliminarProducto(int id);
}

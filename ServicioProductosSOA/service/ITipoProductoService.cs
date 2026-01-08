using CoreWCF;
using ServicioProductosSOA.Models;

namespace ServicioProductosSOA.Services;

[ServiceContract]
public interface ITipoProductoService
{
    [OperationContract]
    List<TipoProducto> ListarTiposProducto();

    [OperationContract]
    TipoProducto ObtenerTipoProducto(int id);

    [OperationContract]
    void InsertarTipoProducto(TipoProducto tipoProducto);

    [OperationContract]
    void ActualizarTipoProducto(TipoProducto tipoProducto);

    [OperationContract]
    void EliminarTipoProducto(int id);
}

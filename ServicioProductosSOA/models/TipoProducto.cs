using System.Runtime.Serialization;
using System.Collections.Generic;

namespace ServicioProductosSOA.Models;

[DataContract]
public class TipoProducto
{
    [DataMember]
    public int Id { get; set; }

    [DataMember]
    public string Tipo { get; set; }

    public TipoProducto(string tipo)
    {
        Tipo = tipo;
    }

    public TipoProducto() { } // Constructor sin parámetros requerido para SOAP
    
    [DataMember]
    public ICollection<Producto> Productos { get; set; } = new List<Producto>();
}

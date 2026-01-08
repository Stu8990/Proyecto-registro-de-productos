using System.Runtime.Serialization;

namespace ServicioProductosSOA.Models;

[DataContract]
public class Producto
{
    [DataMember]
    public int Id { get; set; }

    [DataMember]
    public int IdTipo { get; set; }

    [DataMember]
    public string Descripcion { get; set; }

    [DataMember]
    public double Valor { get; set; }

    [DataMember]
    public double Costo { get; set; }

    public Producto(int idTipo, string descripcion, double valor, double costo)
    {
        IdTipo = idTipo;
        Descripcion = descripcion;
        Valor = valor;
        Costo = costo;
    }

    public Producto() { } // Constructor sin parámetros requerido para SOAP
}

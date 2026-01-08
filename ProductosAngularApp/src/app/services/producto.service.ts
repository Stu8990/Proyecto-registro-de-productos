import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private serviceUrl = 'http://localhost:5008/ProductoService.svc';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Producto[]> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ListarProductos xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/IProductoService/ListarProductos'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => this.parseProductos(response))
    );
  }

  obtenerProducto(id: number): Observable<Producto> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ObtenerProducto xmlns="http://tempuri.org/">
            <id>${id}</id>
          </ObtenerProducto>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/IProductoService/ObtenerProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => this.parseProducto(response))
    );
  }

  insertarProducto(producto: Producto): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ser="http://schemas.datacontract.org/2004/07/ServicioProductosSOA.Models">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:InsertarProducto>
            <tem:producto>
              <ser:Costo>${producto.Costo}</ser:Costo>
              <ser:Descripcion>${producto.Descripcion}</ser:Descripcion>
              <ser:Id>${producto.Id}</ser:Id>
              <ser:IdTipo>${producto.IdTipo}</ser:IdTipo>
              <ser:Valor>${producto.Valor}</ser:Valor>
            </tem:producto>
          </tem:InsertarProducto>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/IProductoService/InsertarProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  actualizarProducto(producto: Producto): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ser="http://schemas.datacontract.org/2004/07/ServicioProductosSOA.Models">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:ActualizarProducto>
            <tem:producto>
              <ser:Costo>${producto.Costo}</ser:Costo>
              <ser:Descripcion>${producto.Descripcion}</ser:Descripcion>
              <ser:Id>${producto.Id}</ser:Id>
              <ser:IdTipo>${producto.IdTipo}</ser:IdTipo>
              <ser:Valor>${producto.Valor}</ser:Valor>
            </tem:producto>
          </tem:ActualizarProducto>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/IProductoService/ActualizarProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  eliminarProducto(id: number): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <EliminarProducto xmlns="http://tempuri.org/">
            <id>${id}</id>
          </EliminarProducto>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/IProductoService/EliminarProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  private parseProductos(xml: string): Producto[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const productos: Producto[] = [];

    const items = xmlDoc.getElementsByTagName('a:Producto');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getElementsByTagName('a:Id')[0]?.textContent || '0';
      const idTipo = item.getElementsByTagName('a:IdTipo')[0]?.textContent || '0';
      const descripcion = item.getElementsByTagName('a:Descripcion')[0]?.textContent || '';
      const valor = item.getElementsByTagName('a:Valor')[0]?.textContent || '0';
      const costo = item.getElementsByTagName('a:Costo')[0]?.textContent || '0';

      productos.push({
        Id: parseInt(id),
        IdTipo: parseInt(idTipo),
        Descripcion: descripcion,
        Valor: parseFloat(valor),
        Costo: parseFloat(costo)
      });
    }

    return productos;
  }

  private parseProducto(xml: string): Producto {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');

    const id = xmlDoc.getElementsByTagName('a:Id')[0]?.textContent || '0';
    const idTipo = xmlDoc.getElementsByTagName('a:IdTipo')[0]?.textContent || '0';
    const descripcion = xmlDoc.getElementsByTagName('a:Descripcion')[0]?.textContent || '';
    const valor = xmlDoc.getElementsByTagName('a:Valor')[0]?.textContent || '0';
    const costo = xmlDoc.getElementsByTagName('a:Costo')[0]?.textContent || '0';

    return {
      Id: parseInt(id),
      IdTipo: parseInt(idTipo),
      Descripcion: descripcion,
      Valor: parseFloat(valor),
      Costo: parseFloat(costo)
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoProducto } from '../models/tipo-producto.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private serviceUrl = 'http://localhost:5008/TipoProductoService.svc';

  constructor(private http: HttpClient) { }

  listarTiposProducto(): Observable<TipoProducto[]> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ListarTiposProducto xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/ITipoProductoService/ListarTiposProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => this.parseTiposProducto(response))
    );
  }

  obtenerTipoProducto(id: number): Observable<TipoProducto> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ObtenerTipoProducto xmlns="http://tempuri.org/">
            <id>${id}</id>
          </ObtenerTipoProducto>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/ITipoProductoService/ObtenerTipoProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => this.parseTipoProducto(response))
    );
  }

  insertarTipoProducto(tipoProducto: TipoProducto): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:ser="http://schemas.datacontract.org/2004/07/ServicioProductosSOA.Models">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:InsertarTipoProducto>
            <tem:tipoProducto>
              <ser:Id>${tipoProducto.Id}</ser:Id>
              <ser:Tipo>${tipoProducto.Tipo}</ser:Tipo>
            </tem:tipoProducto>
          </tem:InsertarTipoProducto>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/ITipoProductoService/InsertarTipoProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  actualizarTipoProducto(tipoProducto: TipoProducto): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ActualizarTipoProducto xmlns="http://tempuri.org/">
            <tipoProducto>
              <Id>${tipoProducto.Id}</Id>
              <Tipo>${tipoProducto.Tipo}</Tipo>
            </tipoProducto>
          </ActualizarTipoProducto>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/ITipoProductoService/ActualizarTipoProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  eliminarTipoProducto(id: number): Observable<any> {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <EliminarTipoProducto xmlns="http://tempuri.org/">
            <id>${id}</id>
          </EliminarTipoProducto>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://tempuri.org/ITipoProductoService/EliminarTipoProducto'
    });

    return this.http.post(this.serviceUrl, soapEnvelope, { headers, responseType: 'text' });
  }

  private parseTiposProducto(xml: string): TipoProducto[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const tiposProducto: TipoProducto[] = [];

    const items = xmlDoc.getElementsByTagName('a:TipoProducto');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getElementsByTagName('a:Id')[0]?.textContent || '0';
      const tipo = item.getElementsByTagName('a:Tipo')[0]?.textContent || '';

      tiposProducto.push({
        Id: parseInt(id),
        Tipo: tipo
      });
    }

    return tiposProducto;
  }

  private parseTipoProducto(xml: string): TipoProducto {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');

    const id = xmlDoc.getElementsByTagName('a:Id')[0]?.textContent || '0';
    const tipo = xmlDoc.getElementsByTagName('a:Tipo')[0]?.textContent || '';

    return {
      Id: parseInt(id),
      Tipo: tipo
    };
  }
}

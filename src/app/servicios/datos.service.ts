import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Articulo} from '../Clases/articulo';
import {Rubro} from '../Clases/rubro';
import {Proveedor} from '../Clases/proveedor';
import {Cliente} from '../Clases/cliente';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  constructor(private httpCli: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getArticulos() {
    return this.httpCli.get(baseUrl + '/api/articulos');
  }

  putArticulo(art: Articulo) {
    return this.httpCli.put<Articulo>(baseUrl + '/api/articuloupdate/' + art.id, art);
  }

  newArticulo(art: Articulo) {
    return this.httpCli.post<Articulo>(baseUrl + '/api/articulonuevo/', art);
  }

  delArticulo(id: number) {
    return this.httpCli.delete(baseUrl + '/api/articuloborrar/' + id);
  }

  getRubros() {
    return this.httpCli.get(baseUrl + '/api/rubros');
  }

  putRubro(rub: Rubro) {
    return this.httpCli.put<Rubro>(baseUrl + '/api/rubroupdate/' + rub.id, rub);
  }

  newRubro(rub: Rubro) {
    return this.httpCli.post<Rubro>(baseUrl + '/api/rubronuevo/', rub);
  }

  delRubro(id: number) {
    return this.httpCli.delete(baseUrl + '/api/rubroborrar/' + id);
  }

  getProveedores() {
    return this.httpCli.get(baseUrl + '/api/proveedores');
  }

  putProveedor(pro: Proveedor) {
    return this.httpCli.put<Proveedor>(baseUrl + '/api/proveedorupdate/' + pro.id, pro);
  }

  newProveedor(pro: Proveedor) {
    return this.httpCli.post<Proveedor>(baseUrl + '/api/proveedornuevo/', pro);
  }

  delProveedor(id: number) {
    return this.httpCli.delete(baseUrl + '/api/proveedorborrar/' + id);
  }

  getClientes() {
    return this.httpCli.get(baseUrl + '/api/clientes');
  }

  putCliente(cli: Cliente) {
    return this.httpCli.put<Cliente>(baseUrl + '/api/clienteupdate/' + cli.id, cli);
  }

  newCliente(cli: Cliente) {
    return this.httpCli.post<Cliente>(baseUrl + '/api/clientenuevo/', cli);
  }

  delCliente(id: number) {
    return this.httpCli.delete(baseUrl + '/api/clienteborrar/' + id);
  }

  newFacturaCliente(cli: Cliente) {
    return this.httpCli.post<Cliente>(baseUrl + '/api/clientenuevafactura/', cli);
  }

  newFacturaProveedor(pro: Proveedor): Observable<any> {
    return this.httpCli.post<Proveedor>(baseUrl + '/api/proveedornuevafactura/',pro);
  }

  getFacturasCompras() {
    return this.httpCli.get(baseUrl + '/api/facturascompras/').pipe(
      map(this.extractData));
  }

  getFacturasVentas() {
    return this.httpCli.get(baseUrl + '/api/facturasventas/').pipe(
      map(this.extractData));
  }

  getFacturaProveedor(id: number) {
    return this.httpCli.get(baseUrl + '/api/proveedorfactura/' + id).pipe(
      map(this.extractData));
  }

  getFacturaCliente(id: number) {
    return this.httpCli.get(baseUrl + '/api/clientefactura/' + id).pipe(
      map(this.extractData));
  }
}
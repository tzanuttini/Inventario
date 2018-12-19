import { Component, OnInit, NgModule } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';
import { Articulo } from 'src/app/clases/articulo';
import { Proveedor } from 'src/app/clases/proveedor';
import { FormGroup, FormControl } from '@angular/forms';
import { Itemcompra } from 'src/app/clases/itemcompra';
import { Facturacompra } from 'src/app/clases/facturacompra';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  compraForm = new FormGroup({ proveedorControl: new FormControl() });
  titulo = 'Factura Compras';
  factura = new Facturacompra();
  proveedores: Proveedor[] = [];
  articulos: Articulo[] = [];
  stockActual: Articulo[] = [];
  items: Itemcompra[] = [];
  seleccion = true;
  prov: Proveedor;
  enviado = false;

  constructor(private dataSrv: DatosService, private router: Router) {
    this.factura.tipo = 'A';
    this.factura.fecha = this.currentDate();
    this.factura.puntoventa = 0;
    this.factura.numero = 0;
   }
   mover(art: String) {
    this.articulos.push(this.stockActual.find(item => item.nombre === art));
    this.stockActual.splice(this.stockActual.indexOf(this.articulos.find(item => item.nombre === art)), 1);
  }
  mover2(art: String) {
    this.stockActual.push(this.articulos.find(item => item.nombre === art));
    this.articulos.splice(this.articulos.indexOf(this.stockActual.find(item => item.nombre === art)), 1);
  }
  private currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  getMax(id: number){
    let res= this.articulos.find(item => item.id === id).cantidad;
    console.log(res);
    return res;
    
  }
  siguiente() {
    if (this.compraForm.controls['proveedorControl'].value !== null && this.articulos.length !== 0) {
      this.prov = this.proveedores.find(p => p.id === this.compraForm.controls['proveedorControl'].value);
      this.cargarItems();
      this.seleccion = false;
    } else {
      alert('Debe seleccionar un proveedor y al menos un artículo.\nVuelva a intentar.');
    }
  }
  cambioTipo() {
    this.calculaFactura();

  }

  cambio(i: number) {

    const it = this.items[i];
    if (this.factura.tipo === 'A') {
      it.subtotal = it.cantidad * it.preciounitario;
    } else {
      it.subtotal = it.cantidad * it.preciounitario * (1 + (it.iva / 100));
    }
    this.calculaFactura();
  }
  private cargarItems() {
    for (let i = 0; i < this.articulos.length; i++) {
      const item = new Itemcompra();
      item.idarticulo = this.articulos[i].id;
      item.renglon = i;
      item.codigoproducto = this.articulos[i].codigo;
      item.descripcion = this.articulos[i].nombre;
      item.cantidad = 1;
      item.preciounitario = +this.articulos[i].preciocompra;
      item.iva = 21;
      item.subtotal = item.preciounitario * 1.21;
      this.items.push(item);
    }
    this.calculaFactura();
  }
  Confirmar() {
    this.enviado = true;
    this.factura.items = this.items;
    this.prov.facturas = [this.factura];

    this.dataSrv.newFacturaProveedor(this.prov)
      .subscribe(
        fac => {
          alert('Registro de Factura creado.');
          this.router.navigate(['/verfacturacompra/' + fac.id]);
        },
        (error: HttpErrorResponse)  => {
          alert(
            'Error: Verifique Tipo, sucursal y número\n' +
            'Status: ' + error.status + '\n' +
            'Status Text: ' + error.statusText + '\n' +
            'Mensaje del Servidor: ' + error.error.name
          );
          this.enviado = false;
        }
      );
  }

  Cancelar() {
    this.seleccion = true;
    this.enviado = false;
    this.articulos = [];
    this.items = [];
    this.ngOnInit();

  }

  ngOnInit() {
    this.dataSrv.getArticulos().subscribe((a: Articulo[]) => this.stockActual = a);
    this.dataSrv.getProveedores().subscribe((p: Proveedor[]) => this.proveedores = p);
  }
  private calculaFactura() {
    this.factura.subtotaliva = 0;
    this.factura.total = 0;
    this.factura.iva21 = 0;
    this.factura.iva10 = 0;

    if (this.factura.tipo === 'A') {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].subtotal = this.items[i].cantidad * this.items[i].preciounitario;
        if (this.items[i].iva >= 20) {
          this.factura.iva21 += this.items[i].subtotal * 0.21;
        } else {
          this.factura.iva10 += this.items[i].subtotal * 0.105;
        }
        this.factura.total += this.items[i].subtotal;

      }
      this.factura.subtotaliva += this.factura.iva21 + this.factura.iva10;
      this.factura.total += this.factura.subtotaliva;
    } else {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].subtotal = this.items[i].cantidad * this.items[i].preciounitario * (1 + (this.items[i].iva / 100));
        this.factura.total += this.items[i].subtotal;

      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';
import { Proveedor } from 'src/app/clases/proveedor';
import { Facturacompra } from 'src/app/clases/facturacompra';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-faccompra',
  templateUrl: './lista-faccompra.component.html',
  styleUrls: ['./lista-faccompra.component.css']
})
export class ListaFaccompraComponent implements OnInit {
  listacompraForm = new FormGroup({ proveedorControl: new FormControl() });
  titulo = 'Listado Facturas Compras';
  proveedores: Proveedor[];
  facturas: Facturacompra[] = [];
  poolfacturas: Facturacompra[];
  factura: Facturacompra= new Facturacompra();
  proveedor: Proveedor= new Proveedor();
  coniva : boolean = false;
  constructor(private dataSrv: DatosService) {}
  
  cambiaProveedor() {
    const id = this.listacompraForm.controls['proveedorControl'].value;
    if (id !== 0) {
      this.facturas = this.poolfacturas.filter(function (factura) {
        return factura.proveedorId === id;
      });
    } else {
      this.facturas = this.poolfacturas;
    }
  }

  ngOnInit() {
    this.dataSrv.getProveedores().subscribe((p: Proveedor[]) => this.proveedores = p);
    this.dataSrv.getFacturasCompras().subscribe(
      (f: Facturacompra[]) => {
        this.poolfacturas = f;
        this.facturas = f;
      });
    this.listacompraForm.controls['proveedorControl'].setValue(0);
    this.newOne();
  }

  verFactura(id: number){
    this.dataSrv.getFacturaProveedor(id).subscribe((fac : Facturacompra) => {
      this.factura = fac;
      this.proveedor = this.proveedores.find(element => element.id === this.factura.proveedorId);
      this.calculaFactura();
      console.log(this.factura.total)
    }) 
  }
  newOne(){
    this.factura.id=null;
    this.factura.puntoventa=0;
    this.factura.numero=0;
    this.factura.fecha="";
    this.factura.items=null;
    this.factura.iva10=0;
    this.factura.iva21=0;
    this.factura.proveedorId=0;
    this.factura.subtotaliva=0;
    this.factura.tipo="";
    this.factura.total=0;

    this.proveedor.id=null;
    this.proveedor.condicioniva="";
    this.proveedor.cuit="";
    this.proveedor.facturas=null;
    this.proveedor.razonsocial="";
  }
  private calculaFactura() {
    this.factura.subtotaliva = 0;
    this.factura.total = 0;
    this.factura.iva21 = 0;
    this.factura.iva10 = 0;

    if (this.factura.tipo.trim() === 'A') {
      this.coniva = true;
      for (let i = 0; i < this.factura.items.length; i++) {
        this.factura.items[i].subtotal = this.factura.items[i].cantidad * this.factura.items[i].preciounitario;
        if (this.factura.items[i].iva >= 20) {
          this.factura.iva21 += this.factura.items[i].subtotal * 0.21;
        } else {
          this.factura.iva10 += this.factura.items[i].subtotal * 0.105;
        }
        this.factura.total += this.factura.items[i].subtotal;

      }
      this.factura.subtotaliva += this.factura.iva21 + this.factura.iva10;
      this.factura.total += this.factura.subtotaliva;
    } else {
      for (let i = 0; i < this.factura.items.length; i++) {
        this.factura.items[i].subtotal = this.factura.items[i].cantidad
          * this.factura.items[i].preciounitario * (1 + (this.factura.items[i].iva / 100));
        this.factura.total += this.factura.items[i].subtotal;

      }
    }
  }
}

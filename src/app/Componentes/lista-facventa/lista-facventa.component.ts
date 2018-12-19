import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/clases/cliente';
import { Facturaventa } from 'src/app/clases/facturaventa';
import { DatosService } from 'src/app/servicios/datos.service';


@Component({
  selector: 'app-lista-facventa',
  templateUrl: './lista-facventa.component.html',
  styleUrls: ['./lista-facventa.component.css']
})
export class ListaFacventaComponent implements OnInit {
  listaventaForm = new FormGroup({ clienteControl: new FormControl() });
  titulo = 'Listado Facturas Ventas';
  clientes: Cliente[];
  facturas: Facturaventa[] = [];
  poolfacturas: Facturaventa[];
  cliente: Cliente;
  factura: Facturaventa = new Facturaventa();
  coniva: boolean;

  constructor(private dataSrv: DatosService) { }
  cambiaCliente() {
    const id = this.listaventaForm.controls['clienteControl'].value;
    if (id !== 0) {
      this.facturas = this.poolfacturas.filter(function (factura) {
        return factura.clienteId === id;
      });
    } else {
      this.facturas = this.poolfacturas;
    }
  }

  ngOnInit() {
    this.dataSrv.getClientes().subscribe((c: Cliente[]) => this.clientes = c);
    this.dataSrv.getFacturasVentas().subscribe(
      (f: Facturaventa[]) => {
        this.poolfacturas = f;
        this.facturas = f;
      });
    this.listaventaForm.controls['clienteControl'].setValue(0);
    this.newOne();
  }

  verFactura(id: number){
    this.dataSrv.getFacturaCliente(id).subscribe((fac : Facturaventa) => {
      this.factura = fac;
      this.cliente = this.clientes.find(element => element.id === this.factura.clienteId);
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
    this.factura.clienteId=0;
    this.factura.subtotaliva=0;
    this.factura.tipo="";
    this.factura.total=0;

    this.cliente.id=null;
    this.cliente.condicioniva="";
    this.cliente.cuit="";
    this.cliente.facturas=null;
    this.cliente.razonsocial="";
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

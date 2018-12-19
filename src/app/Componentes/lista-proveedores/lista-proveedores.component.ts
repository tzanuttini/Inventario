import { Component, OnInit } from '@angular/core';

import { DatosService } from 'src/app/servicios/datos.service';
import { Proveedor } from 'src/app/Clases/proveedor';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  proveedores: any;
  titulo = 'Proveedores';
  proveedor: Proveedor = new Proveedor();

  constructor(private dataSrv: DatosService) {
    this.newOne();
  }

  ngOnInit() {
    this.dataSrv.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }
  borrar(id: number) {
    if (confirm("Desea borrar el proveedor con el id " + id))
      this.dataSrv.delProveedor(id).subscribe(() => alert("Se borro el proveedor con el id " + id));
  }
  editar(id: number) {
    this.proveedor = this.proveedores.find(p => p.id == id);
  }
  modificarProveedor() {
    if (this.proveedor.id != null) {
      this.dataSrv.putProveedor(this.proveedor).subscribe(() => alert("Se realizo exitosamente el update de " + this.proveedor.razonsocial));
      location.reload();
    } else {
      this.dataSrv.newProveedor(this.proveedor).subscribe(() => alert("Se creo el nuevo proveedor " + this.proveedor.razonsocial));
      location.reload();
    }
  }
  newOne() {
    this.proveedor.condicioniva = "";
    this.proveedor.cuit = "";
    this.proveedor.id = null;
    this.proveedor.razonsocial = "";
    this.proveedor.facturas = null;
  }
}
import { Component, OnInit } from '@angular/core';

import { DatosService } from 'src/app/servicios/datos.service';
import { Cliente } from 'src/app/Clases/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: any;
  titulo = 'Clientes';
  admin = false;
  cliente: Cliente = new Cliente();

  constructor(private dataSrv: DatosService,
              private router: Router) { }

  ngOnInit() {
    this.dataSrv.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.newOne();
  }

  editar(a: string){
    this.cliente = this.clientes.find(cli => cli.id === a);
  }
  modificarCliente(){
    if(this.cliente.id != null){
      this.dataSrv.putCliente(this.cliente).subscribe(
        () => { alert("Se pudo modificar el cliente!")},
        error =>{
          alert("No se pudo editar el cliente! ");
          console.log(error);
        }
      )
      }else{
        this.dataSrv.newCliente(this.cliente).subscribe(
          ()=>{ alert("Se pudo agregar el nuevo cliente!")} ,
          error=>{
            alert("No se pudo agregar el cliente "+ error)
          }
        )
      }
      location.reload();
    }
  
    borrar(a: String) {
      if(confirm("Desea borrar este cliente con el id " + a + " ?") ){
        var cli = this.clientes.find(function (elemento) {
          return elemento.id == a;
        });
        this.dataSrv.delCliente(cli.id).subscribe(()=> {
          alert("cliente borrado");
          location.reload();
        })
      }
    }
  newOne(){
    this.cliente.id = null;
    this.cliente.razonsocial="";
    this.cliente.facturas=null;
    this.cliente.cuit="";
    this.cliente.condicioniva="";
  }

}
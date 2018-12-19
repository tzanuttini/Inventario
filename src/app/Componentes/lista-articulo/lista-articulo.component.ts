import { Component, OnInit } from '@angular/core';

import { DatosService } from 'src/app/Servicios/datos.service';
import { Articulo } from 'src/app/Clases/articulo';
import { Rubro } from 'src/app/Clases/rubro';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-articulo',
  templateUrl: './lista-articulo.component.html',
  styleUrls: ['./lista-articulo.component.css']
})
export class ListaArticuloComponent implements OnInit {
  articulos: any;
  titulo = '';
  vendedor = false;
  articulo: Articulo = new Articulo();
  rubros: Rubro[];
  constructor(private dataSrv: DatosService,
              private router: Router) {
    
   }

  ngOnInit() {
    this.dataSrv.getArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
    this.dataSrv.getRubros().subscribe((r: Rubro[]) => {
      this.rubros = r;
    });
    this.newOne();
  }
  borrar(a: String) {
    if(confirm("Desea borrar este articulo con el codigo " + a + " ?") ){
      var art = this.articulos.find(function (elemento) {
        return elemento.codigo == a;
      });
      this.dataSrv.delArticulo(art.id).subscribe(()=> {
        alert("articulo borrado");
        location.reload();
      })
    }
  }
  editar(a: string){
    this.titulo="Editar cliente";
    this.articulo = this.articulos.find(arti => arti.codigo === a)
  }
  subirModificacionArticulo(){
    if(this.articulo.id != null){
    this.articulo.rubro.nombre = this.rubros.find(r => r.id==this.articulo.rubro.id).nombre;
    this.dataSrv.putArticulo(this.articulo).subscribe(
      () => { alert("Se pudo modificar el articulo!");
              this.router.navigate(['/articulos'])},
      error =>{
        alert("No se pudo editar el articulo! ");
        console.log(error);
      }
    )
    location.reload();
    }else{
      this.articulo.rubro.nombre = this.rubros.find(r => r.id==this.articulo.rubro.id).nombre;
      this.dataSrv.newArticulo(this.articulo).subscribe(
        ()=>{ alert("Se pudo agregar el nuevo articulo!");
              this.router.navigate(['/articulos'])} ,
        error=>{
          alert("No se pudo agregar el articulo "+ error)
        }
      )
    }
  }
  newOne(){
    this.titulo="Crear cliente";
    this.articulo.id = null;
    this.articulo.cantidad=0;
    this.articulo.codigo="";
    this.articulo.descripcion="";
    this.articulo.nombre="";
    this.articulo.preciocompra=0;
    this.articulo.precioventa=0;
    this.articulo.rubro = new Rubro();
    this.articulo.rubro.id = 1;
    this.articulo.rubro.nombre = "";
  }
}
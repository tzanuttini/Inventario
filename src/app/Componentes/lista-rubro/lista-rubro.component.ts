import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/clases/rubro';
import { DatosService } from 'src/app/servicios/datos.service';


@Component({
  selector: 'app-lista-rubro',
  templateUrl: './lista-rubro.component.html',
  styleUrls: ['./lista-rubro.component.css']
})

export class ListaRubroComponent implements OnInit {
  rubros: Rubro[];
  titulo = '';
  admin = false;
  rub: Rubro = new Rubro();


  constructor(private dataSrv: DatosService) {
    this.dataSrv.getRubros().subscribe((r: Rubro[]) => {
      this.rubros = r;
    });
  }

  ngOnInit() {
  }
  borrar(id: number, nombre: String) {
    if (confirm("Desea borrar el rubro " + nombre + " ?")) {
      this.dataSrv.delRubro(id).subscribe(() => {
        alert("Rubro borrado");
        location.reload();
      })
    }
  }
  editar(id: number) {
    this.titulo="Modificar Rubro";
    this.rub = this.rubros.find(r => r.id == id);
  }
  modificarRubro() {
    if (this.rub.id != null)
      this.dataSrv.putRubro(this.rub).subscribe(r => alert("Se pudo updatear " + r.nombre));
    else
      this.dataSrv.newRubro(this.rub).subscribe(r => alert("Se pudo crear " + r.nombre));

      location.reload();
  }
  newOne() {
    this.titulo="Crear Rubro";
    this.rub.id = null;
    this.rub.nombre = "";
  }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaArticuloComponent } from './Componentes/lista-articulo/lista-articulo.component';
import { ListaProveedoresComponent } from './Componentes/lista-proveedores/lista-proveedores.component';
import { ListaClientesComponent } from './Componentes/lista-clientes/lista-clientes.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { DatosService } from './servicios/datos.service';
import { ListaRubroComponent } from './Componentes/lista-rubro/lista-rubro.component';
import { VentaComponent } from './Componentes/venta/venta.component';
import { CompraComponent } from './Componentes/compra/compra.component';
import { ListaFacventaComponent } from './Componentes/lista-facventa/lista-facventa.component';
import { ListaFaccompraComponent } from './Componentes/lista-faccompra/lista-faccompra.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaArticuloComponent,
    ListaRubroComponent,
    ListaProveedoresComponent,
    ListaClientesComponent,
    NavbarComponent,
    VentaComponent,
    CompraComponent,
    ListaFacventaComponent,
    ListaFaccompraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

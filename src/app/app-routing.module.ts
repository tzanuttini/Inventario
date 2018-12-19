import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRubroComponent } from './Componentes/lista-rubro/lista-rubro.component';
import { ListaProveedoresComponent } from './Componentes/lista-proveedores/lista-proveedores.component';
import { ListaClientesComponent } from './Componentes/lista-clientes/lista-clientes.component';
import { ListaArticuloComponent } from './Componentes/lista-articulo/lista-articulo.component';
import { CompraComponent} from './Componentes/compra/compra.component';
import { VentaComponent } from './Componentes/venta/venta.component';
import { ListaFaccompraComponent } from './Componentes/lista-faccompra/lista-faccompra.component';
import { ListaFacventaComponent } from './Componentes/lista-facventa/lista-facventa.component';

const routes: Routes = [
  { path: 'listaarticulos', component: ListaArticuloComponent },
  { path: 'listarubro', component: ListaRubroComponent },
  { path: 'listaproveedores', component: ListaProveedoresComponent },
  { path: 'listaclientes', component: ListaClientesComponent },

  { path: 'compra', component: CompraComponent },
  { path:'venta', component: VentaComponent },
  { path: 'articulos', component: ListaArticuloComponent },
  { path: 'listafacturaventa', component:ListaFacventaComponent },
  { path: 'listafacturacompra', component:ListaFaccompraComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
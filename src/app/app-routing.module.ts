import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './module/venta/venta.component';
import { ListadoComponent } from './module/venta/listado/listado.component';

const routes: Routes = [
  {
    path:'', component:VentaComponent
  },
  {
    path:'ventas', children:[
      {path:'reportes', component:ListadoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

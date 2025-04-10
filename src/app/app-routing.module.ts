import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './module/venta/venta.component';
import { ListadoComponent } from './module/venta/listado/listado.component';
import { ListadoprodComponent } from './module/productos/listadoprod/listadoprod.component';
import { AddStockComponent } from './module/productos/add-stock/add-stock.component';
import { AddprodComponent } from './module/productos/addprod/addprod.component';
import { AddCategoryComponent } from './module/productos/add-category/add-category.component';

const routes: Routes = [
  {
    path:'', component:VentaComponent
  },
  {
    path:'productos', children:[
      {path:'listado', component:ListadoprodComponent},
      {path:'stock', component:AddStockComponent},
      {path:'agregar', component:AddprodComponent},
      {path:'categoria', component:AddCategoryComponent}
    ]
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

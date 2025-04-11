import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VentaComponent } from './module/venta/venta.component';
import { ProductosComponent } from './module/productos/productos.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ListadoComponent } from './module/venta/listado/listado.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoprodComponent } from './module/productos/listadoprod/listadoprod.component';
import { AddStockComponent } from './module/productos/add-stock/add-stock.component';
import { AddprodComponent } from './module/productos/addprod/addprod.component';
import { AddCategoryComponent } from './module/productos/add-category/add-category.component';
import { DetalleStockComponent } from './module/productos/detalle-stock/detalle-stock.component';


@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    ProductosComponent,
    SidebarComponent,
    ListadoComponent,
    ListadoprodComponent,
    AddStockComponent,
    AddprodComponent,
    AddCategoryComponent,
    DetalleStockComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

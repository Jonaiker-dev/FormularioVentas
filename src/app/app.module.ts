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

@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    ProductosComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule

    
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

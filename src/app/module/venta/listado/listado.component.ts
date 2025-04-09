import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../data/venta.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent{
  public datoventas:any=[]
  constructor(private vs:VentaService){
    vs.GetAllSales().subscribe((data:any)=>{
      this.datoventas=data
    })
  }
}

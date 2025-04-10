import { Component} from '@angular/core';
import { VentaService } from '../../../data/venta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent{
  FormFecha!:FormGroup
  public datoventas:any=[]
  montochela:number=0
  montoangela:number=0
  public vendedormontos:any=[]

  constructor(private vs:VentaService, private ff:FormBuilder){
   this.FormFecha=this.ff.group({
    fechainicio:['',Validators.required],
    fechafin:['',Validators.required]
   })
  }

  GenerarReporte(){
    
    this.vs.GetSaleForDateRange(this.FormFecha.get('fechainicio')?.value,this.FormFecha.get('fechafin')?.value)
    .subscribe((data:any)=>{
      this.datoventas=data
      data.forEach( ({nombre_vendedor,precioventa}:any)=> {
        if(nombre_vendedor==="Arcela"){
          this.montochela+=precioventa
        }else{
          this.montoangela+=precioventa
        }
      });
      this.vendedormontos=[
        {'Vendedor':'Arcela', 'Monto': this.montochela},
        {'Vendedor':'Anghela', 'Monto': this.montoangela}
      ]
      this.Reporte(crypto.randomUUID())
    })

    this.FormFecha.reset()
    this.montochela=0, this.montoangela=0
  }
  
  
  Reporte(date:string){
    const worksheet = XLSX.utils.json_to_sheet(this.datoventas);
    const worksheet2 = XLSX.utils.json_to_sheet(this.vendedormontos);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Ventas');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Ganancia por Vendedor');
    XLSX.writeFile(workbook, `reporte-${date}.xlsx`);
  }  

}

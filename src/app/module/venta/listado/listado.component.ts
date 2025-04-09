import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../data/venta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
      this.Reporte()

      data.forEach( ({nombre_vendedor,precioventa}:any)=> {
        if(nombre_vendedor==="Arcela"){
          this.montochela+=precioventa
        }else{
          this.montoangela+=precioventa
        }

      });
    })
  }
  
  Reporte(){
    const pdf = new jsPDF();
    console.log(pdf);
    
    pdf.text('Reporte de Ventas', 10, 10);
  
    // Definir las columnas de la tabla
    const columnas = [
      { header: 'ID Venta', dataKey: 'idventa' },
      { header: 'Nombre', dataKey: 'nombre' },
      { header: 'Cantidad', dataKey: 'cantidad_venta' },
      { header: 'Precio Venta', dataKey: 'precioventa' },
      { header: 'Fecha Venta', dataKey: 'fechaventa' },
      { header: 'Ganancia', dataKey: 'ganancia' },
      { header: 'Método de Pago', dataKey: 'metodopago' },
      { header: 'Vendedor', dataKey: 'nombre_vendedor' },
    ];
  
    // La variable ventasData ya es un array, así que no necesitamos convertirlo.
  
    // Agregar la tabla al PDF
    (pdf as any).autoTable({ // Usar "as any" porque la definición de tipos de jsPDF puede no incluir autoTable
      head: [columnas.map(c => c.header)], // Extraer los encabezados
      body: this.datoventas, // Usar el array de ventas directamente
      startY: 20, // Posición inicial de la tabla
    });
  
    // Guardar el PDF
    pdf.save('reporte_de_ventas.pdf');    
  }

}

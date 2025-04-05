
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from './data/producto.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public categorias:any=[]
  public productos:any=[]
  ngOnInit(): void {
    this.ps.GetCategoria().subscribe((data:any)=>{
      this.categorias=data
    });
   
    console.log(this.categorias);
    
  }

  public FormVentas:FormGroup;

  constructor(private fb:FormBuilder, private ps:ProductoService){
    this.FormVentas=this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: [{ value: '', disabled: true }],
      metodo: ['', Validators.required],
      vendedor: ['', Validators.required]
    })

  }

  Enviar(){

  }
  CargarProductos(e:any){
    this.ps.GetProductByCategory(e.target.value).subscribe((data)=>{
      this.productos=data
      
    })
  } 

  PrecioProducto(e:any){
    this.ps.GetProductPrice(e.target.value).subscribe((data:any)=>{
      const numero=Object.values(data[0])[0];
     this.FormVentas.get('precio')?.setValue(numero)
   
    })
    
  }

}

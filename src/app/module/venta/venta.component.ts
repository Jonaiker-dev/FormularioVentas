import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../data/producto.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent implements OnInit {

  public categorias:any=[]
  public productos:any=[]
  public colorproducto:any=[]
  FormVentas!:FormGroup;
  
  constructor(private fb:FormBuilder, private ps:ProductoService){}
  
  ngOnInit(): void {
    this.FormVentas=this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      color:['',Validators.required],
      cantidad: ['', Validators.required],
      precio: ['',Validators.required],
      metodo: ['', Validators.required],
      vendedor: ['', Validators.required]
    })
    
    this.ps.GetCategoria().subscribe((data:any)=>{
      this.categorias=data
    });
    
  }



  Enviar(){

  }
  CargarProductos(e:any){
    this.ps.GetProductByCategory(e.target.value).subscribe((data)=>{
      this.productos=data
    })
      
  } 

  ColorProducto(e:any){
    this.ps.GetColorbyProduct(e.target.selectedOptions[0].textContent).subscribe((data:any)=>{
      this.colorproducto=data
    })
    console.log(typeof e.target.selectedOptions[0].textContent);
    
  }
  
  PrecioProducto(e:any){
    const opcionColor=e.target.selectedOptions[0].textContent
    this.ps.GetProductPrice(opcionColor,this.FormVentas.get('nombre')?.value).subscribe((data:any)=>{
      const numero=Object.values(data[0])[0];
     this.FormVentas.get('precio')?.setValue(numero)
    })
  
  }

}

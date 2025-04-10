import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../data/producto.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { VentaService } from '../../data/venta.service';
import { ToastrService } from 'ngx-toastr';

//VALIDATOR PERSONALIZADO PARA EL STOCK






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
  ValidStock=true;
  

  constructor(private fb:FormBuilder, private ps:ProductoService,private vs:VentaService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.FormVentas=this.fb.group({
      id:[''],
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      color:['',Validators.required],
      cantidad: ['', Validators.required],
      stock:[0],
      precio: ['',Validators.required],
      metodo: ['', Validators.required],
      vendedor: ['', Validators.required],
      fechaventa: ['', Validators.required]
    })
    
    this.ps.GetCategoria().subscribe((data:any)=>{
      this.categorias=data
    });
    
    
    
  }



  Enviar(){
    const body={
      'idproducto':this.FormVentas.get('id')?.value,
      'cantidad_venta':this.FormVentas.get('cantidad')?.value,
      'precioventa':this.FormVentas.get('precio')?.value,
      'ganancia':0,
      'metodopago':this.FormVentas.get('metodo')?.value,
      'idvendedor':(this.FormVentas.get('vendedor')?.value==="arcela")?1:2,
      'fechaventa':this.FormVentas.get('fechaventa')?.value
    }

    this.vs.AddSaleProduct(body).subscribe({
      next: (response) => {
        this.toastr.success('Venta Registrada', 'Éxito');
        this.FormVentas.reset()
        // Puedes realizar otras acciones después del éxito, como limpiar el formulario
      },
      error: (error) => {
        this.toastr.error('Error al registrar venta', 'Error');
        console.error('Error al agregar dato:', error);
      },
    })
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

  }
  
  PrecioProducto(e:any){
    const opcionColor=e.target.selectedOptions[0].textContent
    this.ps.GetProductPrice(opcionColor,this.FormVentas.get('nombre')?.value).subscribe((data:any)=>{
      const idprod=Object.values(data[0])[0];
      const numero=Object.values(data[0])[1];
      const stock:any= Object.values(data[0])[2];
     this.FormVentas.get('precio')?.setValue(numero)
     this.FormVentas.get('id')?.setValue(idprod)
     this.FormVentas.get('stock')?.setValue(stock)
     
    }) 
  }

  ValidarStock(e:any){
    if(e.target.value>this.FormVentas.get('stock')?.value){
      return this.ValidStock=false
    }
    return this.ValidStock=true
  }

  
}

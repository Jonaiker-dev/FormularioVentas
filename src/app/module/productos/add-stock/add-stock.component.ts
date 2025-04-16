import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../data/producto.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent {
    FormStock!:FormGroup;
    Alldata:any=[]
    datacategoria:any=[]
    dataproductos:any=[]
    datacolores:any=[]

    constructor(private fb:FormBuilder,private ps:ProductoService,private toastr:ToastrService){
      this.FormStock=fb.group({
        categoria:['',Validators.required],
        producto:['',Validators.required],
        color:['',Validators.required],
        cantidad:['',Validators.required],
        costo:['',Validators.required]
      })

      ps.GetAllProduct().subscribe((data:any)=>{
        this.Alldata=data
       
        this.datacategoria=[...new Set(data.map((x:any)=>x.categoria))]
        .map(cat=>({categoria:cat}))
      })
    }

    listarproductos(e:any){
    
       this.ps.GetProductByCategory(e.target.selectedOptions[0].textContent).subscribe((data)=>{
        this.dataproductos=data
       })
      
    }

    ObtenerColor(e:any){
        this.datacolores=this.Alldata.filter((x:any)=>x.producto===e.target.selectedOptions[0].textContent)
    }

   

    AgregarStock(){
      const idprod=this.Alldata.find((x:any)=>(x.producto===this.FormStock.get('producto')?.value && x.color===this.FormStock.get('color')?.value) )
      const body={
        'idprod_historial':idprod.id,
        'cantidad':this.FormStock.get('cantidad')?.value,
        'costo_adquisicion':this.FormStock.get('costo')?.value,
      }
      this.ps.PostAddStock(body).subscribe({
        next: () => {
          this.toastr.success('Se agrego al stock', 'Éxito');
          this.FormStock.reset()
          // Puedes realizar otras acciones después del éxito, como limpiar el formulario
        },
        error: (error) => {
          this.toastr.error('Error agregar stock', 'Error');
          console.error('Error agregar stock: ', error);
        },
      })
    }

}

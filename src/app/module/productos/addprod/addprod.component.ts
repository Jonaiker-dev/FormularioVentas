import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductoService } from '../../../data/producto.service';
import { ToastrService } from 'ngx-toastr';

export function noWhitespaceAtEndValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || typeof control.value !== 'string') {
      return null; // Si el valor es nulo o no es string, no hay espacios al final
    }

    const hasWhitespaceAtEnd = /[\s]+$/.test(control.value);

    return hasWhitespaceAtEnd ? { 'whitespaceAtEnd': true } : null;
  };
}



@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrl: './addprod.component.css'
})
export class AddprodComponent {

  FormProducto!:FormGroup;
  datacategoria:any=[]
  datacolores:any=[]

  constructor(private fa:FormBuilder,private ps:ProductoService,private toastr:ToastrService){
    this.FormProducto=fa.group({
      nombre:['',[Validators.required,noWhitespaceAtEndValidator()]],
      categoria:['',Validators.required],
      stock:[0,Validators.required],
      precioventa:[0,Validators.required],
      precio_unitario:[0,Validators.required],
      description:['',Validators.required]
    })

    ps.GetCategoria().subscribe((data)=>{
      this.datacategoria=data
    })
    ps.GetColor().subscribe((data)=>{
      this.datacolores=data
    })
  }

  Categoria(e:any){
    const categoria=e.target.selectedOptions[0].textContent
    const idcat= this.datacategoria.find((x:any)=>x.nombreCat===categoria).idcategoria
    this.FormProducto.get('categoria')?.setValue(idcat)
  }
  Color(e:any){
    const color=e.target.selectedOptions[0].textContent
    const idcolor= this.datacolores.find((x:any)=>x.nombreColor===color).idcolor
    this.FormProducto.get('description')?.setValue(idcolor)
  }

  AgregarProducto(){
    this.ps.PostAddProduct(this.FormProducto.value).subscribe({
      next: () => {
        this.toastr.success('Se agrego el producto', 'Éxito');
        this.FormProducto.reset()
        // Puedes realizar otras acciones después del éxito, como limpiar el formulario
      },
      error: (error) => {
        this.toastr.error('Error agregar producto', 'Error');
        console.error('Error agregar producto: ', error);
      },
    })
  }
}

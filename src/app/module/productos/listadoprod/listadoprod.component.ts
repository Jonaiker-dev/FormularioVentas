import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../data/producto.service';

@Component({
  selector: 'app-listadoprod',
  templateUrl: './listadoprod.component.html',
  styleUrl: './listadoprod.component.css'
})
export class ListadoprodComponent implements OnInit {
  datacategorias:any=[]
  alldata:any=[]
  datoproductos:any=[]

  constructor(private ps:ProductoService){}

  ngOnInit(){
    this.ps.GetAllProduct().subscribe((data:any)=>{
      this.alldata=data
      this.datacategorias=[...new Set(data.map((e:any)=>e.categoria))]
      .map (categoria => ({ categoria: categoria }));
      console.log(data);
      
    })
     
  }

  CategoriaElegida(e:any){
     this.datoproductos =this.alldata.filter((data:any)=>data.categoria===e.target.selectedOptions[0].textContent)
     console.log(this.datoproductos);        
  }


}

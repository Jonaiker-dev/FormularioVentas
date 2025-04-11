import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../data/producto.service';

@Component({
  selector: 'app-detalle-stock',
  templateUrl: './detalle-stock.component.html',
  styleUrl: './detalle-stock.component.css'
})
export class DetalleStockComponent implements OnInit {
  id:string|null='';
  datahistorial:any=[]
  
  constructor(private route:ActivatedRoute,private ps:ProductoService){}
   
    ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
        this.id=params.get('id')
        this.ps.GetProductHistory(this.id).subscribe((data:any)=>{
          this.datahistorial=data.sort((a:any,b:any)=>{
            if (b.id > a.id) {
              return 1;
            }
           
            if (a.id > b.id) {
              return -1;
            }
            
            return 0
          })
          console.log(this.datahistorial);
        
        })
      })
    }
  
}

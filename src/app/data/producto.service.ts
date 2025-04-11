import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public apiURL=environment.APIURL;
  public headers= new HttpHeaders({
    'apikey':environment.APIKEY,
    'Authorization':environment.BEARER
  })
  constructor(private http:HttpClient) { }

  GetAllProduct(){
    return this.http.get(`${this.apiURL}listado_producto?order=id.asc`,{headers:this.headers})
  }

  GetCategoria(){
    return this.http.get(`${this.apiURL}categorias?select=nombreCat`,{headers:this.headers})
  }

  GetProductByCategory(category:string){
    return this.http.get(`${this.apiURL}producto_unico?select=producto&categoria=eq.${category}`,{headers:this.headers})
  }


  GetColorbyProduct(product:string){
    return this.http.get(`${this.apiURL}listado_producto?select=color&producto=eq.${product}`,{headers:this.headers})
  }
  
  GetProductPrice(color:string,producto:string){
    return this.http.get(`${this.apiURL}listado_producto?select=id,precio_venta,stock&color=eq.${color}&producto=eq.${producto}`,{headers:this.headers})
  }

  GetProductHistory(id:string|null){
    return this.http.get(`${this.apiURL}detalle_historial?prodid=eq.${id}&order=prodid.desc&`,{headers:this.headers})
  }

  PostAddStock(body:any){
    return this.http.post(`${this.apiURL}/historial_aumento_stock`,body,{headers:this.headers})  
  }
}

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

  GetCategoria(){
    return this.http.get(`${this.apiURL}categorias?select=nombreCat`,{headers:this.headers})
  }

  GetProductByCategory(category:string){
    return this.http.get(`${this.apiURL}listado_producto?select=id,producto&categoria=eq.${category}`,{headers:this.headers})
  }

  GetProductPrice(id:string){
    return this.http.get(`${this.apiURL}productos?select=precioventa&idprod=eq.${id}`,{headers:this.headers})
  }
}

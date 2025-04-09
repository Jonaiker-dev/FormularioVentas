import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  public apiURL=environment.APIURL;
  public headers= new HttpHeaders({
      'apikey':environment.APIKEY,
      'Authorization':environment.BEARER
  })

  constructor(public http:HttpClient) { }

  AddSaleProduct(body:any){
    
    return this.http.post(`${this.apiURL}/ventas`,body,{headers:this.headers})  
  }

  GetAllSales(){
    return this.http.get(`${this.apiURL}listado_venta?select=nombre,cantidad_venta,ganancia,fechaventa`,{headers:this.headers})
  }
}

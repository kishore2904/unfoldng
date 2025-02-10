import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { API_PATH, REST_API } from '../utils/constants';
import { ProductColor } from '../../model/productColor.model';

@Injectable({
  providedIn: 'root'
})
export class ProductColorService {

  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public getAllColor(): Observable<ProductColor[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<ProductColor[]>(`${API_PATH}${REST_API}/allProductColors`)
  }

  public addNewColor(color:ProductColor):Observable<ProductColor[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<ProductColor[]>(`${API_PATH}${REST_API}/productColor`,color,{headers})
  }


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductColor } from '../../model/productColor.model';
import { API_PATH, REST_API } from '../utils/constants';
import { ProductSize } from '../../model/productSize.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService {

   constructor(private httpClient: HttpClient) { }
  
    private createAuthorizationHeader(): HttpHeaders {
      const token = localStorage.getItem('jwtToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
  
    public getAllSize(): Observable<ProductSize[]> {
      const headers = this.createAuthorizationHeader();
      return this.httpClient.get<ProductSize[]>(`${API_PATH}${REST_API}/allProductSizes`)
    }
  
    public addNewSize(size:ProductSize):Observable<ProductSize[]> {
      const headers = this.createAuthorizationHeader();
      return this.httpClient.post<ProductSize[]>(`${API_PATH}${REST_API}/productSize`,size,{headers})
    }

    public getSizeById(sizeId:number):Observable<ProductSize>{
      const headers = this.createAuthorizationHeader();
      return this.httpClient.get<ProductSize>(`${API_PATH}${REST_API}/productSize/`+sizeId,{headers})
    }
}

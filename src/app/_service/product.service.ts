import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private httpClient:HttpClient) { }
  private createAuthorizationHeader(): HttpHeaders {
      const token = localStorage.getItem('jwtToken'); 
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  public createNewProduct(product: Product,categoryId: number): Observable<Product>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Product>(`${API_PATH}${REST_API}/${categoryId}/products`, product,{ headers
    });
  }

  public getAllProducts():Observable<Product[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Product[]>(`${API_PATH}${REST_API}/products`,{headers});
  }

  public getProductDetails(categoryId:number,productId:number):Observable<Product>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Product>(`${API_PATH}${REST_API}/${categoryId}/${productId}`,{headers});
  }
  
}

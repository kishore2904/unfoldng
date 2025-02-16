import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../../model/orders.model';
import { Observable } from 'rxjs';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public createOrder(order: Orders): Observable<Orders>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Orders>(`${API_PATH}${REST_API}/orders`,order,{headers});
  }

  public getUserOrder(userId:string):Observable<Orders[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Orders[]>(`${API_PATH}${REST_API}/order/user/`+userId,{headers})
  }
}

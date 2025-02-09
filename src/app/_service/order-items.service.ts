import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../../model/orders.model';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  
}
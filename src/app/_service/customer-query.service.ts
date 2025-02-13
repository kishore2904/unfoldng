import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH, REST_API } from '../utils/constants';
import { Observable } from 'rxjs';
import { CustomerQuery } from '../../model/customerQuery.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerQueryService {

constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public submitQuery(query: CustomerQuery): Observable<CustomerQuery> {
      const headers = this.createAuthorizationHeader();
      return this.httpClient.post<CustomerQuery>(`${API_PATH}${REST_API}/customer_query/submit`,query, { headers })
    }
  }
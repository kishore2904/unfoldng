import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public subscribe(email: string){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post(`${API_PATH}${REST_API}/subscribe?email=`+email,{headers});
  }
}

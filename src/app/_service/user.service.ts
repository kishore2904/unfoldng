import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_PATH ="http://localhost:8080/";
  headers = new HttpHeaders({"No-Auth":"True"})

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  public loginUser(loginData: any){
    return this.httpClient.post(this.API_PATH+"authenticate",loginData,{headers: this.headers}).pipe(map((response) =>{
      return response;
    }))
  }
}

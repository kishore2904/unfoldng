import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_PATH = "http://localhost:8080/";
  headers = new HttpHeaders({ "No-Auth": "True" })

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService

  ) { }

  public loginUser(loginData: any) {
    return this.httpClient.post(this.API_PATH + "authenticate", loginData, { headers: this.headers }).pipe(map((response) => {
      return response;
    }))
  }

  public userRegister(userData:any){
    return this.httpClient.post(this.API_PATH +"registerNewUser",userData,{ headers: this.headers }).pipe(map((response)=>{
      return response;
    }))
  }

  public roleMatch(allowedRoles: any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();



    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          

          if (userRoles[i].role === allowedRoles[j]) {
            isMatch = true;
            break;
          }
        }
        if (isMatch) {
          break;
        }
      }
    }
    return isMatch;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { API_PATH } from '../../app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  headers = new HttpHeaders({  })


  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // Handle login request
  // Example login service
public loginUser(loginData: any) {
    return this.httpClient.post(API_PATH + "authenticate", loginData, { headers: this.headers }).pipe(map((response) => {
      return response;
  }));
}


  // Handle user registration
  public userRegister(userData: any) {
    return this.httpClient.post(API_PATH + "registerNewUser", userData, { headers: this.headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error("Registration error: ", error);
        throw error;  // Properly handle errors
      })
    );
  }

  // Role match function for user access
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

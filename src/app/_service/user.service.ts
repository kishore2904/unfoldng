import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { API_PATH, REST_API } from '../../app/utils/constants';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  public loginUser(loginData: any) {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post(API_PATH + "authenticate", loginData).pipe(map((response) => {
      return response;
    }));
  }

  public userRegister(userData: any) {
    return this.httpClient.post(API_PATH + "registerNewUser", userData).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error("Registration error: ", error);
        throw error; 
      })
    );
  }

  public getUserDetails(userId:string){
    return this.httpClient.get<User>(API_PATH+REST_API+'/userDetail?userId='+userId);
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailVerification } from '../../model/emailVerification.model';
import { Observable } from 'rxjs';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private httpClient: HttpClient) { }
  
    private createAuthorizationHeader(): HttpHeaders {
      const token = localStorage.getItem('jwtToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

    public sendVerificationCode(code: EmailVerification):Observable<EmailVerification>{
      const headers = this.createAuthorizationHeader();
      return this.httpClient.post<EmailVerification>(`${API_PATH}${REST_API}/send-verification-code`,code,{headers});
    }

    public verifyCode(code:EmailVerification):Observable<EmailVerification>{
      const headers = this.createAuthorizationHeader();
      return this.httpClient.post<EmailVerification>(`${API_PATH}${REST_API}/verify-code`,code,{headers});
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../../model/coupon.model';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  validateCoupon(couponCode: string): Observable<Coupon> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Coupon>(`${API_PATH}${REST_API}/coupon?code=` + couponCode, { headers })
  }

  getAllCoupons(): Observable<Coupon[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Coupon[]>(`${API_PATH}${REST_API}/allCoupon`, { headers })
  }

  addNewCoupon(coupon: any): Observable<Coupon> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Coupon>(`${API_PATH}${REST_API}/coupon`, coupon, { headers })
  }
}

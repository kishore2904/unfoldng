import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../../model/wishlist.model';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  

  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public addToWishlist(userId:string,productId:number):Observable<Wishlist>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Wishlist>(`${API_PATH}${REST_API}/addWishlist?userId=`+userId+`&productId=`+productId,{headers})
  }

  public getWishlist(userId:string):Observable<Wishlist[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Wishlist[]>(`${API_PATH}${REST_API}/wishlist/`+userId,{headers})
  }

  removeFromWishlist(wishlistId:number):Observable<Wishlist[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<Wishlist[]>(`${API_PATH}${REST_API}/remove/`+wishlistId,{headers})
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { API_PATH, REST_API } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public addToCart(cart: Cart): Observable<Cart> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Cart>(`${API_PATH}${REST_API}/cartProducts`, cart, { headers });
  }

  public getCartItems(userId: string):Observable<Cart[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Cart[]>(`${API_PATH}${REST_API}/cartProducts?userId=`+userId,{headers})
  }

  public deleteCartItem(cartId:number):Observable<Cart>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<Cart>(`${API_PATH}${REST_API}/cart/`+cartId,{headers})
  }

}

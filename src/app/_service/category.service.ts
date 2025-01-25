import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH, REST_API } from '../utils/constants';
import { Observable } from 'rxjs';
import { Category } from '../../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public getCategory(): Observable<Category[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Category[]>(`${API_PATH}${REST_API}/allCategories`, { headers });
  }

  public addCategory(category: Category): Observable<Category> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Category>(`${API_PATH}${REST_API}/categories`, category, { headers });
  }

  public updateCategory(categoryId: number, category: Category): Observable<Category> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.put<Category>(
      `${API_PATH}rest/unfold/categories/${categoryId}`, 
      category, 
      { headers }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../utils/constants';
import { Observable } from 'rxjs';
import { Category } from '../../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  public getCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_PATH}rest/unfold/allCategories`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${API_PATH}rest/unfold/categories`, category);
  }  

}

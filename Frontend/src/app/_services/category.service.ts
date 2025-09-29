import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../_models/Category/category';
import { GenericResponse } from '../_models/generic-response';
import { CategoryLocation } from '../_models/Category/category-location';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private client = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'categories';

  getCategories() {
    return this.client.get<GenericResponse<Category>>(this.baseUrl);
  }
  getCategoryLocations(id: number) {
    return this.client.get<CategoryLocation[]>(
      `${this.baseUrl}/${id}/locations`
    );
  }

  getCategoryById(id: number) {
    return this.client.get<Category>(`${this.baseUrl}/${id}`);
  }
  newCategory(name: string) {
    return this.client.post<Category>(`${this.baseUrl}?name=${name}`, {});
  }
  deleteCategory(id: number) {
    return this.client.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateCategory(id: number, name: string) {
    return this.client.put<Category>(
      `${this.baseUrl}/${id}?id=${id}&name=${name}`,
      {}
    );
  }
}

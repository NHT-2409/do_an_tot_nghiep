import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Category';

  getAllCategories(): Observable<category[]> {
    return this.httpClient.get<any>(this.apiURL + `/GetCategoryList`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfCategories');
  }
  addCategory(product: any) {
    return this.httpClient.post(this.apiURL + `/InsertCategory`, product)
  }

  updateCategory(product: any) {
    return this.httpClient.put(this.apiURL +`/UpdateCategory/id`, product)
  }

  deleteCategory(id: string) {
    return this.httpClient.delete(this.apiURL + `/DeleteCategory?id=${id}`)
  }

  getById(id: string) {
    return this.httpClient.get(this.apiURL + `/GetCategory/id?id=${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brand } from '../model/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Brand';

  getAllBrands(): Observable<brand[]> {
    return this.httpClient.get<any>(this.apiURL + `/GetBrandList`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfBrands');
  }

  deleteBrand(id: any){
    return this.httpClient.delete(this.apiURL + `/DeleteBrand?id=${id}`);
  }

  addBrand(brand: any) {
    return this.httpClient.post(this.apiURL + `/InsertBrand`, brand)
  }

  updateBrand(brand: any) {
    return this.httpClient.put(this.apiURL +`/UpdateBrand/id`, brand)
  }

}

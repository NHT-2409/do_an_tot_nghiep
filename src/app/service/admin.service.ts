import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Admin';

  getAllAdmins(): Observable<admin[]> {
    return this.httpClient.get<any>(this.apiURL + `/GetAdmins`);
  }

  // getTotal() {
  //   return this.httpClient.get(this.apiURL + '/GetTotalOfBrands');
  // }

  // deleteBrand(id: any){
  //   return this.httpClient.delete(this.apiURL + `/DeleteBrand?id=${id}`);
  // }

  getAdminById(id: string) {
    return this.httpClient.post(this.apiURL + `/GetAdmin/`, id)
  }

  // updateBrand(brand: any) {
  //   return this.httpClient.put(this.apiURL +`/UpdateBrand/id`, brand)
  // }
}

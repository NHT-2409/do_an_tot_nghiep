import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Store';

  getAllStores(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetStores`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfStore');
  }

  getStoreById(id: any){
    return this.httpClient.get(this.apiURL + `/GetStoreById/id?id=${id}`);
  }

  // addNews(news: any) {
  //   return this.httpClient.post(this.apiURL + `/InsertNews`, news)
  // }

  // updateNews(news: any) {
  //   return this.httpClient.put(this.apiURL +`/UpdateNews/id`, news)
  // }

}

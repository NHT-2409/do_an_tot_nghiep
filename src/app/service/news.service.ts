import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/News';

  getAllNews(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetNewsList`);
  }

  getNewsById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetNewsById/id?id=${id}`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfNews');
  }

  deleteNews(id: any){
    return this.httpClient.delete(this.apiURL + `/DeleteNews?id=${id}`);
  }

  addNews(news: any) {
    return this.httpClient.post(this.apiURL + `/InsertNews`, news)
  }

  updateNews(news: any) {
    return this.httpClient.put(this.apiURL +`/UpdateNews/id`, news)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Order';

  GetOrdersList(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetOrdersList`);
  }

  GetOrderById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetOrderById/id?id=${id}`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfOrders');
  }

  addOrder(order: any) {
    return this.httpClient.post(this.apiURL + '/InsertOrder',order);
  }

  deleteOrder(order: any) {
    return this.httpClient.delete(this.apiURL + `/DeleteOrder/${order}`);
  }

  updateStatus(order: any) {
    return this.httpClient.put(this.apiURL + `/UpdateStatus?orderId=${order.orderId}&status=${order.status}&userId=${order.userId}`,order);
  }

}

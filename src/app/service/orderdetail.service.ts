import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  setOrderProductDetailData(data: any) {
    this.orderProductDetailData.next(data);
  }

  private orderProductDetailData = new BehaviorSubject<any>(null);
  orderProductDetailData$ = this.orderProductDetailData.asObservable();


  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/OrderProductDetail';

  addOrderProductDetails(order: any) {
    return this.httpClient.post(this.apiURL+'/InsertOrderProductDetail',order);
  }

  getCartByOrderId(id: string){
    return this.httpClient.get(this.apiURL + `/GetOrderDetailById/id?id=${id}`);
  }

  getInforById(userId: string){
    return this.httpClient.get(this.apiURL + `/GetCartOfUser?userId=${userId}`);
  }

  countQtyByDate(date: any) {
    return this.httpClient.get(this.apiURL + `/GetTotalQtyByCreatedTime?date=${date}`);
  }



}

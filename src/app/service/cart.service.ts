import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/CartItems';

   //chia sẻ dữ liệu giữa các component
   private cartDataSubject = new BehaviorSubject<any[]>([]);
   cartData$: Observable<any[]> = this.cartDataSubject.asObservable();

   updateCartData(cartData: any[]) {
     this.cartDataSubject.next(cartData);
   }

   oncartChange(cart: any) {
    this.cartItemSource.next(cart);
  }



  private cartItemSource = new Subject<any[]>();
  cartItem$ = this.cartItemSource.asObservable();

  getCarts(userId: string){
    return this.httpClient.get(this.apiURL + `/GetCart?userId=${userId}`);
  }

  deleteCartItem(id: any){
    return this.httpClient.delete(this.apiURL + `/DeleteCart?userId=${id.userId}&productId=${id.productId}`);
  }

  addCart(cart: any) {
    return this.httpClient.post<any>(this.apiURL + `/InsertCart?userId=${cart.userId}&productId=${cart.productId}&qty=${cart.qty}`, cart);
  }

  updateCart(cart: any) {
    return this.httpClient.put(this.apiURL +`/UpdateCart?userId=${cart.userId}&productId=${cart.productId}&newQty=${cart.qty}`,cart);
  }



}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Revenue';


  countQtyByDate(date: any) {
    return this.httpClient.get(this.apiURL + `/GetTotalQtyByCreatedTime?date=${date}`);
  }

  countPriceByDate(date: any) {
    return this.httpClient.get(this.apiURL + `/GetTotalPriceByCreatedTime?date=${date}`);
  }

  countQtyByQuarter(year: any, quarter: any) {
    return this.httpClient.get(this.apiURL + `/GetQtyByQuarter?date=${year}&quarter=${quarter}`);
  }

  countPriceByQuarter(year: any, quarter: any) {
    return this.httpClient.get(this.apiURL + `/GetTotalPriceByQuarter?date=${year}&quarter=${quarter}`);
  }

  getTopProduct(startDate: any, endDate: any) {
    return this.httpClient.get(this.apiURL + `/GetQtyByProduct?startDate=${startDate}&endDate=${endDate}`);
  }


}

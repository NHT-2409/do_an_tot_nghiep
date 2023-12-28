import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers = new HttpHeaders({'Content-Type':'application/json'});

  apiURL = 'http://localhost:7149/api/User';

  constructor( private httpClient: HttpClient ) { }

  login(user: user) {
    return this.httpClient.post<any>(this.apiURL + '/LoginUser', user, { headers: this.headers });
  }

  checkRole(credentials: { email: string; password: string }) {
    return this.httpClient.get<any>(this.apiURL + `/GetUserInfo?email=${credentials.email}&password=${credentials.password}`);
  }



}

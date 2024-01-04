import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/User';

  getAllUser(): Observable<user[]> {
    return this.httpClient.get<any>(this.apiURL + `/GetUsers`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfUsers');
  }

  register(user: user) {
    return this.httpClient.post<any>(this.apiURL + '/RegisterUser', user);
  }

  deleteUser(id: any): Observable<any> {
    console.log('🌷🌷🌷 ~ id: ', id)
    return this.httpClient.delete<any>(this.apiURL + `/Delete?id=${id}`)
  }

  editUser(data: any): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + `/Update`, data);
  }
  editPassword(data: any) {
    return this.httpClient.put<any>(this.apiURL + `/updatePassword?password=${data.password}&id=${data.id}`, data);
  }
  editInfo(data: any): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + `/updateInfo`, data);
  }

  getUserByID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + `/GetUser/${id}`);
  }

  getUserInfo(user: any) {
    return this.httpClient.get<any>(this.apiURL + `/GetUserInfo?email=${user.email}&password=${user.password}`);
  }

  sendEmail(email: any) {
    return this.httpClient.post<any>(this.apiURL + `/sendVerification?email=${email}`,email);
  }

  checkCode(code: any) {
    return this.httpClient.post<any>(this.apiURL + `/compareKey?userInput=${code}`,code);
  }


}

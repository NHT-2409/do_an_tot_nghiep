import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = false;
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  getCurrentUser(): any {
    return this.userDataSubject.value;
  }


  constructor(private cookieService: CookieService) {
    this.loggedIn = this.cookieService.get('loggedIn') === 'true';
    const userData = this.cookieService.get('userData');
    if (userData) {
      this.userDataSubject.next(JSON.parse(userData));
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setUserData(userData: any) {
    // Lưu thông tin đăng nhập vào cookie
    this.cookieService.set('loggedIn', 'true'); // Đánh dấu đã đăng nhập
    this.cookieService.set('userData', JSON.stringify(userData)); // Lưu thông tin user (chuyển thành chuỗi JSON)
    this.userDataSubject.next(userData); // Cập nhật BehaviorSubject để thông báo rằng đã có dữ liệu người dùng mới
    this.loggedIn = true;
  }

  getUserData(): any {
    return this.userDataSubject.value; // Trả về giá trị hiện tại của BehaviorSubject
  }
  getUserDataFromCookie(): any {
    const userData = this.cookieService.get('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    // Xóa thông tin đăng nhập khi người dùng logout
    this.cookieService.delete('loggedIn');
    this.cookieService.delete('userData');
    this.userDataSubject.next(null); // Cập nhật BehaviorSubject để thông báo rằng không có dữ liệu người dùng
    this.loggedIn = false;
  }
}

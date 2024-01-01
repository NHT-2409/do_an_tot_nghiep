import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: any
  constructor(private router: Router, private cookieService: CookieService, private loginService: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const userDataString = this.cookieService.get('userData');

    if (userDataString) {
      // Phân tích chuỗi JSON thành đối tượng JavaScript
      const user = JSON.parse(userDataString);

      return this.loginService.checkRole(user).pipe( //được sử dụng để kết hợp nhiều toán tử thành một chuỗi thực thi
        switchMap((res) => {
          this.user = res;
          console.log("🚀 ~ AdminGuard ~ user:", this.user);

          // Kiểm tra nếu người dùng có quyền admin
          if (this.user && this.user?.role === 'admin') {
            return of(true); // Cho phép truy cập vào trang /admin
          } else {
            return of(false); //là một hàm tạo observable cơ bản trong RxJS, được sử dụng để tạo một observable chứa các giá trị cụ thể
          }
        }),
        catchError(() => of(false)),
        tap((canActivate) => { // tap được sử dụng để thực hiện các tác vụ không ảnh hưởng đến giá trị observable vd chuyển hướng đến các trang /admin
          if (!canActivate) {
            // Nếu người dùng không có quyền admin hoặc không đăng nhập, chuyển hướng đến trang /home
            this.router.navigate(['/home']);
          }
        })
      );
    } else {
      // Nếu không có thông tin người dùng, chuyển hướng đến trang /home
      this.router.navigate(['/home']);
      return of(false);
    }
  }
}

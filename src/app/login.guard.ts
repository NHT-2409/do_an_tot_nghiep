import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
  ) {}


  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // Chuyển hướng đến trang chính nếu đã đăng nhập
      return false; // Không cho phép truy cập vào trang đăng nhập
    }
    return true; // Cho phép truy cập vào trang đăng nhập nếu chưa đăng nhập
  }
}

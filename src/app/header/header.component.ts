import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { AdminService } from '../service/admin.service';
import { AuthServiceService } from '../service/auth-service.service';
import { user } from '../model/user.model';
import { CartService } from '../service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentUser: any;
  user: any;
  admin: any;

  hrefMyCart: string = '';
  isAdmin: boolean = false;

  searchKeyword: any = '';

  isHidenBadge: boolean = false;
  cartItemsQuantity: number = 0;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private productService: ProductService,
    private userService: UserService,
    private loginService: LoginService,
    private adminService: AdminService,
    private authService: AuthServiceService,
    private cartService: CartService,
    private cookieService: CookieService,

  ) {}

  ngOnInit(): void {

    this.authService.userData$.subscribe((userData) => {

      if (userData) {
        this.currentUser = userData;

        this.check_Role(this.currentUser?.email, this.currentUser?.password);
      }
    });

    this.isHidenBadge = this.cartItemsQuantity <= 0;

    this.cartService.cartItem$.subscribe(cart => {
      this.getCartItemsQuantity();
    });

  }


  onSearch() {

    console.log("🚀 ~ HeaderComponent ~ this.searchKeyword:", this.searchKeyword)


  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }

  getCartItemsQuantity() {
    this.cartService.getCarts(this.currentUser.id).subscribe((res: any) => {
      console.log("🚀 ~ HeaderComponent ~ res:", res)
      this.cartItemsQuantity = res?.reduce( (totalQty: number, cartItem: any) =>
      totalQty + (cartItem.qty || 0)
      ,0);
      this.isHidenBadge = this.cartItemsQuantity <= 0;
      this.cartService.updateCartData(res);
    });
  }

  userinfo() {
    if (this.currentUser) {
      this.router.navigate(['/user-info'], { state: { user: this.currentUser } });
      console.log("🤜 ~ currentUser:", this.currentUser)
    }
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  navigateAdminPage() {
    this.router.navigate(['/admin']);
  }


  logOut() {
    this.authService.logout(); // Gọi phương thức logout từ AuthService
    this.cookieService.deleteAll();
    this.reloadCurrentRoute();
    this.toastService.show('Logout successfully!');
  }
  openCart() {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Đăng nhập để xem giỏ hàng')
    } else {
      // Thực hiện hành động mở giỏ hàng
    }
    this.router.navigate(['/cart']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  check_Role(email: string, password: string) {

    this.loginService.checkRole({ email, password }).subscribe(
      (data) => {
        console.log("🚀 ~ HeaderComponent ~ data:", data)
        if (typeof data === 'string') {
          // Xử lý khi data là chuỗi
          console.log('Data is a string:', data);
          // Hoặc có thể thông báo lỗi
        } else {
          // Xử lý khi data là JSON object
          this.currentUser = data;
          this.isAdmin = this.currentUser?.role === 'admin';
          this.getCartItemsQuantity();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}

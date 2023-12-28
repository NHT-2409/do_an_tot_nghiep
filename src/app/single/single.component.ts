import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { product } from '../model/product.model';
import { AuthServiceService } from '../service/auth-service.service';
import { CartService } from '../service/cart.service';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit{
  productId: string = '';
  product: any;
  currentUser: any;
  quantity: number = 1;
  userId: string = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router,
    public loadingService: LoadingService,
    private authService: AuthServiceService,
  )
  {
    this.currentUser = this.authService.getCurrentUser();

   }

  ngOnInit() {
    this.loadingService.showLoading();

    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      this.productService.getById(this.productId).subscribe((data) => {
        this.product = data as product;
        this.loadingService.hideLoading();
      })
    });
  }

  quantityExceedsAvailable: boolean = false;

handelQuantity(action: string) {
  if (action === 'down' && this.quantity >= 2) {
    this.quantity--;
  }

  if (action === 'up') {
    this.quantity++;
  }

  // Kiểm tra xem số lượng mua có vượt quá số lượng hiện có không
  this.quantityExceedsAvailable = this.quantity > this.product.qty;
}

addToCart() {
  if (this.authService.isLoggedIn()) {
    const user = {
      email: this.currentUser.email,
      password: this.currentUser.password,
    }

    this.userService.getUserInfo(user).subscribe((res) => {
      this.loadingService.showLoading();

      const cart = {
        userId: res.id,
        productId: this.product.id,
        qty: this.quantity
      }

      // Kiểm tra xem số lượng mua có vượt quá số lượng hiện có không
      if (this.quantityExceedsAvailable) {
        this.toastService.show(`Số lượng mua vượt quá số lượng hiện có (${this.product.qty})`, 'err');
        this.loadingService.hideLoading();
        return;
      }

      // Kiểm tra xem số lượng hiện có có lớn hơn 0 không
      if (this.product.qty === 0) {
        this.toastService.show('Sản phẩm đã hết hàng', 'err');
        this.loadingService.hideLoading();
        return;
      }

      this.cartService.addCart(cart).subscribe(res => {
        // Xử lý khi thêm vào giỏ hàng thành công
      }, (err) => {
        switch(err?.error?.text) {
          case 'inserted': {
            this.cartService.oncartChange(err?.error?.text);
            this.loadingService.hideLoading();
            this.toastService.show(`Added ${this.product?.name} to the cart!`);
            break;
          }
        }
      });

      // this.router.navigate(['/cart']);
    });
  } else {
    // Nếu chưa đăng nhập, chuyển hướng tới trang Login
    this.toastService.show('Need to log in to purchase', 'err');
    this.router.navigate(['/login']);
  }
}

}

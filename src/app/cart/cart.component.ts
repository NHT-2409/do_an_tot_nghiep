import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { AuthServiceService } from '../service/auth-service.service';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  totalPrice: number = 0;
  cartData: any;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthServiceService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private router: Router,
    ) {
      // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
      this.isLoggedIn = this.authService.isLoggedIn();
    }

  ngOnInit(): void {
    this.loadingCart();

  }

  loadingCart() {
    this.loadingService.showLoading();
    // Subscribe để lắng nghe sự thay đổi trong dữ liệu cart
    this.cartService.cartData$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log('Cart Data:', this.cartData);
      this.loadingService.hideLoading();
    });
  }

  getTotalPrice(): number {
    return this.cartData.reduce((total: any, item: any) => total + (item.product_id.price * item.qty), 0);
  }

  updateOrderProductDetail(item: any) {
    const cart = {
      userId: item.users_id.id,
      productId: item.product_id.id,
      qty: item.qty
    };

    if (item.qty === 0) {
      this.cartService.deleteCartItem(cart).subscribe(
        res => {
        },
        err => {
          // Handle successs
          this.totalPrice = this.getTotalPrice(); // Update total price on success
          this.toastService.show('Delete successfully', 'err');
          this.reloadPage();
        }
      );
    } else {
      this.cartService.updateCart(cart).subscribe(
        res => {
        },
        err => {
          this.totalPrice = this.getTotalPrice(); // Update total price on success
          this.toastService.show('Update successfully', 'success');
          this.reloadPage();
        }
      );
    }
  }

  reloadPage() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  deleteAll(item: any){
    const cart = {
      userId: item?.users_id?.id,
      productId: item?.product_id?.id
    };

    this.cartService.deleteCartItem(cart).subscribe(
      res => {
      },
      err => {
        // Handle successs
        this.totalPrice = this.getTotalPrice(); // Update total price on success
        this.toastService.show('Delete successfully', 'err');
        this.reloadPage();
      }
    );
  }


  decrementQty(item: any) {
    if (item.qty > 0) {
      item.qty--;
      this.updateOrderProductDetail(item);
    }
  }

  incrementQty(item: any) {
    item.qty++;
    this.updateOrderProductDetail(item);
  }

}

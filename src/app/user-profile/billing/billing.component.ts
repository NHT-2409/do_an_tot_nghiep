import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartService } from 'src/app/service/cart.service';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  currentUser: any[] = [];
  orderProductDetails: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private userService: UserService,
    private loadingService: LoadingService,
    private orderdetailService: OrderdetailService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        console.log("🚀 ~ BillingComponent ~ userData:", userData)
        this.getUserInfo(userData?.email, userData?.password);
      }
    });

  }

  getTotalPrice(): number {
    return this.orderProductDetails.reduce((total: any, item: any) => total + (item.product_id.price * item.qty), 0);
  }

  getUserInfo(email: any, password: any) {
    const user = {
      email: email,
      password: password,
    };

    this.userService.getUserInfo(user).subscribe((res) => {

      if (Array.isArray(res)) {
        this.currentUser = res;
      } else {
        this.cartService.cartData$.subscribe((cartData) => {
          this.orderProductDetails = cartData;
        });
        // Nếu phản hồi không phải là mảng, biến nó thành mảng với một phần tử
        this.currentUser = [res];
      }
    });
  }
}

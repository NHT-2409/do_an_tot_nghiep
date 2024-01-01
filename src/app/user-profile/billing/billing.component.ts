import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartService } from 'src/app/service/cart.service';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { UserService } from 'src/app/service/user.service';
import { BillingDetailComponent } from './billing-detail/billing-detail.component';

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
    public dialog: MatDialog,
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
        console.log("🚀 ~ BillingComponent ~ this.currentUser:", res)
        this.orderdetailService.getInforById(res.id).subscribe((data: any) => {
          this.orderProductDetails = data;
          console.log("🤜 ~ this.userOrders:", this.orderProductDetails)
        })
    });
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0:
        return 'Chờ xác nhận';
      case 1:
        return 'Đã xác nhận';
      case 2:
        return 'Đang giao';
      case 3:
        return 'Đã giao thành công';
      default:
        return 'Trạng thái không xác định';
    }
  }
  detail(item: any) {
    const dialogRef = this.dialog.open(BillingDetailComponent, {
      width: '600px',
      data: {
        orderProductDetails: item,
      }
    });
    console.log("🤜 ~ item:", item)
    }

}

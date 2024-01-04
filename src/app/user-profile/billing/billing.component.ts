import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartService } from 'src/app/service/cart.service';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { UserService } from 'src/app/service/user.service';
import { BillingDetailComponent } from './billing-detail/billing-detail.component';
import { OrderService } from 'src/app/service/order.service';
import { ToastService } from 'src/app/service/toast.service';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  currentUser: any;
  orderProductDetails: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private userService: UserService,
    private loadingService: LoadingService,
    private orderdetailService: OrderdetailService,
    private orderService: OrderService,
    public dialog: MatDialog,
    public toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {

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
      this.currentUser = [res]
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
        return 'Giao thành công';
      default:
        return 'Trạng thái không xác định';
    }
  }
  detail(item: any) {
    const dialogRef = this.dialog.open(BillingDetailComponent, {
      width: '1200px',
      data: {
        orderProductDetails: item,
      }
    });
    console.log("🤜 ~ item:", item)
  }


  checkStatus(status: any): string {
    if (status === 0) {
      return 'cancelable';
    } else if ([1, 2].includes(status)) {
      return 'non-cancelable';
    } else if (status === 3) {
      return 'received-or-cancel';
    }
    return ''; // Trả về chuỗi rỗng hoặc một giá trị mặc định nếu cần
  }

  // Bạn cũng cần thêm các hàm xử lý sự kiện cho các nút (ví dụ: cancelOrder, confirmReceived).
  cancelOrder(order: any){

  }

  confirmReceived(order: any ,status: any){
    console.log("🚀 ~ ManageOrderShowComponent ~ idStatus:", order)

    const newStatus = {
      orderId: order.id,
      status: status,
      userId: order.userId.id,
    }
    console.log("🚀 ~ ManageOrderShowComponent ~ newProduct:", newStatus)

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to confirm?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.orderService.updateStatus(newStatus).subscribe(res => {
      }, (err) => {
        switch(err?.error?.text) {
          case "updated": {
            this.toastService.show(`Confirm successfully!`);
           break;
         }
        }
      })
    }
  });

}


}

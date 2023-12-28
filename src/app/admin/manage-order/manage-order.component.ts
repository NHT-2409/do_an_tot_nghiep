import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageOrderShowComponent } from './manage-order-show/manage-order-show.component';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent {
  total_price = 0;

  orders: any;
  currentPage: number = 1;

  constructor(
    private toastService: ToastService,
    public loadingService: LoadingService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService
    ){}

    ngOnInit(): void {
      this.getOrders();

  }

  getOrders() {
    this.loadingService.showLoading();
    this.orderService.GetOrdersList().subscribe((res: any) => {
      this.orders = res;
      this.loadingService.hideLoading();
    })
  }

  showOrder(item: any) {
    console.log("🚀 ~ ManageOrderComponent ~ item:", item)
    this.loadingService.showLoading();
    const dialogRef = this.dialog.open(ManageOrderShowComponent, {
      width: '1200px',
      data: {
        order: item,
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      this.getOrders();
    });
  }

  deleteProduct(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.productService.deleteProduct(item?.id).subscribe(res =>{
    //     }, (err) => {
    //       switch(err?.error?.text) {
    //         case 'deleted': {
    //           this.toastService.show(`Delete ${item?.name} successfully!`);
    //           this.getProducts();
    //           break;
    //         }
    //       }
    //     })
    //   }
    // });
  }

}

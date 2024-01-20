import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageOrderShowComponent } from './manage-order-show/manage-order-show.component';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent {
  total_price = 0;
  orders: any;
  originalOrders: any; // Dữ liệu gốc từ server
  currentPage: number = 1;
  selectedStatus: number = 5; // Mặc định là trạng thái "Tất cả"
  showFilterDropdown: boolean = false;
  ascendingOrder: boolean = true;

  constructor(
    private toastService: ToastService,
    public loadingService: LoadingService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,

    ){}

    ngOnInit(): void {
      this.getOrders();
  }

  getOrders() {
    this.loadingService.showLoading();
    this.orderService.GetOrdersList().subscribe((res: any) => {
      this.orders = res;
      this.originalOrders = res; // Lưu trữ dữ liệu gốc để lọc
      this.loadingService.hideLoading();
    })
  }

  toggleFilter() {
    this.showFilterDropdown = !this.showFilterDropdown;

    if (this.showFilterDropdown) {
      this.ascendingOrder = !this.ascendingOrder;

      this.orders.sort((a: { status: number }, b: { status: number }) => {
        console.log("🚀 ~ ManageOrderComponent ~ status:", a.status)

        return this.ascendingOrder ? a.status - b.status : b.status - a.status;
      });
    } else {

      this.orders = [...this.originalOrders];
    }
  }

  onStatusFilterChange(selectedStatus: number) {
    this.selectedStatus = selectedStatus;

    // Lọc dữ liệu trên frontend
    if (this.selectedStatus == 5) {
      this.orders = this.originalOrders;
    } else {
      this.orders = this.originalOrders.filter((order: { status: number; }) => order.status == this.selectedStatus);
    }
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.deleteOrder(item?.id).subscribe(res =>{
        }, (err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show(`Delete ${item?.name} successfully!`);
              this.getOrders();
              break;
            }
          }
        })
      }
    });
  }

}

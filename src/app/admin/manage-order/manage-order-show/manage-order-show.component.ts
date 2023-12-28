import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { get } from 'jquery';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { CartService } from 'src/app/service/cart.service';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-manage-order-show',
  templateUrl: './manage-order-show.component.html',
  styleUrls: ['./manage-order-show.component.scss'],
})
export class ManageOrderShowComponent {
  currentPage: number = 1;
  order: any;

  editStatus: any;
  dialog: any;

  orders: any;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private orderdetailService: OrderdetailService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageOrderShowComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { order: any },
  ) {}

  ngOnInit(): void {
    this.order = this.data.order;

    this.getCartById(this.order.id);
  }

  getCartById(id: any){
    // this.loadingService.showLoading();
    this.orderdetailService.getCartByOrderId(id).subscribe((res: any) => {
      this.orders = res;
      console.log("🚀 ~ ManageOrderShowComponent ~  this.orders:",  this.orders)
      const orderProductDetails = this.orders;
      this.orderdetailService.setOrderProductDetailData(orderProductDetails);
      // this.loadingService.hideLoading();
    })
  }


onNoClick(): void {
  this.dialogRef.close();
}


edit(idStatus: any, status: number) {
console.log("🚀 ~ ManageOrderShowComponent ~ idStatus:", idStatus)

  const newStatus = {
    orderId: idStatus.id,
    status: status,
    userId: idStatus.userId.id,
  }
  console.log("🚀 ~ ManageOrderShowComponent ~ newProduct:", newStatus)


  this.orderService.updateStatus(newStatus).subscribe(res => {
  }, (err) => {
    switch(err?.error?.text) {
      case "updated": {
        this.toastService.show(`Update successfully!`);
        break;
      }
    }
  })
}


}

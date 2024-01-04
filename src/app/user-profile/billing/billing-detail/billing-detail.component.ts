import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.scss']
})
export class BillingDetailComponent implements OnInit {
  currentPage: number = 1;
  orderProductDetails: any;
  dialog: any;
  orderDetails: any;

  constructor(
    private loadingService: LoadingService,
    private orderdetailsService: OrderdetailService,
    public dialogRef: MatDialogRef<BillingDetailComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { orderProductDetails: any },
  ) {}
  ngOnInit(): void {
    this.orderProductDetails = this.data.orderProductDetails
    console.log("🚀 ~ BillingDetailComponent ~ this.data.orderProductDetails:", this.data.orderProductDetails)

    console.log("🤜 ~ this.order:", this.orderProductDetails?.orderId?.id)
    this.getOrderdetails(this.orderProductDetails?.orderId?.id);
  }

  getOrderdetails(id: any){
    console.log("🤜 ~ id:", id)
    this.orderdetailsService.getCartByOrderId(id).subscribe((res: any) => {
      this.orderDetails = res;
      console.log("🤜 ~ res:", res)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

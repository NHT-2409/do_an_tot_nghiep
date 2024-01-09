import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { UcWidgetModule } from 'ngx-uploadcare-widget';


@Component({
  selector: 'app-manage-statistical',
  templateUrl: './manage-statistical.component.html',
  styleUrls: ['./manage-statistical.component.scss']
})
export class ManageStatisticalComponent implements OnInit{
  orders: any[] = [];
  selectedDate: any = new Date().toISOString().split('T')[0];



  totalOrders: any;

  constructor(private orderDetailService: OrderdetailService) {}

  ngOnInit(): void {

  }

  calculateTotalOrders(date: any): void {
    this.orderDetailService.countQtyByDate(date).subscribe((orders) => {
      this.totalOrders = orders
      console.log("🚀 ~ ManageStatisticalComponent ~ date:", orders)
    });
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }



  uploadedImageUrl: any
  onUploadComplete(info: any) {
    console.log("🤜 ~ info.cdnUrl:", info)
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
    // this.uploadedImageUrl = info.cdnUrl;
  }

}

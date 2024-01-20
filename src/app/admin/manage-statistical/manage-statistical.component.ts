import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { RevenueService } from 'src/app/service/revenue.service';
import { ToastService } from 'src/app/service/toast.service';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';


@Component({
  selector: 'app-manage-statistical',
  templateUrl: './manage-statistical.component.html',
  styleUrls: ['./manage-statistical.component.scss']
})
export class ManageStatisticalComponent implements OnInit{
  orders: any[] = [];
  selectedDate: any = new Date().toISOString().split('T')[0];
  totalPriceOrders: any;
  totalQtyOrders: any;

  availableYears: number[] = [];
  selectedYear: any;
  selectedQuarter: any;
  totalQtyOrdersByQuarter: any
  totalPriceOrdersQuarter: any

  topProduct: any;
  startDate: any;
  endDate: any;
  currentPage: number = 1;

  constructor(
    private orderDetailService: OrderdetailService,
    private revenueService: RevenueService,
    private orderService: OrderService,
    private toastService: ToastService,
    public dialog: MatDialog,

  ) {
    // Tính toán danh sách các năm có thể chọn, ví dụ: từ 2020 đến năm hiện tại
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.availableYears.push(year);
    }
  }

  ngOnInit(): void {

  }

  calculateQtyTotalOrders(date: any): void {
    this.revenueService.countQtyByDate(date).subscribe((orders) => {
      this.totalQtyOrders = orders
      this.revenueService.countPriceByDate(date).subscribe((orders) => {
        this.totalPriceOrders = orders
      });
    });
  }



  // Hàm được gọi khi người dùng nhấp vào mỗi nút quý
  setSelectedQuarter(quarter: number): void {
    // Kiểm tra xem năm đã được nhập hay chưa
    if (!this.selectedYear) {
      alert('Vui lòng nhập năm trước khi chọn quý.');
      return;
    }

    this.selectedQuarter = quarter;
    this.calculateQtyTotalOrdersQuarter();
  }

  // Hàm tính toán tổng đơn hàng cho quý đã chọn
  calculateQtyTotalOrdersQuarter(): void {
    // Kiểm tra xem năm và quý đã được chọn hay chưa
    if (!this.selectedYear || !this.selectedQuarter) {
      alert('Vui lòng nhập năm và chọn quý.');
      return;
    }

    this.revenueService.countQtyByQuarter(this.selectedYear, this.selectedQuarter).subscribe((order) => {
      this.totalQtyOrdersByQuarter = order
      this.revenueService.countPriceByQuarter(this.selectedYear, this.selectedQuarter).subscribe((orders) => {
        this.totalPriceOrdersQuarter = orders
      });
    });
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }



  getTopProduct() {
    if (this.startDate && this.endDate && this.startDate <= this.endDate) {
      this.revenueService.getTopProduct(this.startDate, this.endDate)
        .subscribe(
          (response: any) => {
            this.topProduct = response;
            console.log("🤜 ~ response:", response);
          },
          () => {

          }
        );
    } else {
      this.toastService.show('Ngày bắt đầu không được lớn hơn ngày kết thúc!!','err')
    }
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  viewImage(url: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      width: '600px',
      height: '600px',
      data: {
        imageUrl: url
      }
    });
  }

}

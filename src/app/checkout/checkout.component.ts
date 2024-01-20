import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { AuthServiceService } from '../service/auth-service.service';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { OrderdetailService } from '../service/orderdetail.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  totalPrice: number = 0;
  cartData: any;
  currentOrder: any;

  selectedPaymentMethod = 1;

  checkoutForm: any;


  constructor(
    private orderService: OrderService,
    private orderdetailService: OrderdetailService,
    private cartService: CartService,
    private authService: AuthServiceService,
    private toastService: ToastService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    ) {}



  ngOnInit(): void {
    this.loadingcart();

    this.checkoutForm = this.formBuilder.group({
      order_name: ['', [Validators.required]],
      order_gender: ['', [Validators.required]],
      order_phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      order_street: ['', [Validators.required]],
      order_wards: ['', [Validators.required]],
      order_district: ['', [Validators.required]],
      order_city: ['', [Validators.required]],
      note: ['', [Validators.required]],
      paymentMethodId: ['', [Validators.required]],
    });

  }

  loadingcart(){
    // Subscribe để lắng nghe sự thay đổi trong dữ liệu cart
    this.cartService.cartData$.subscribe((cartData) => {
      this.cartData = cartData;
      // console.log('Cart Data:', this.cartData);
    });
  }

  onChange() {}

  getTotalPrice(): number {
    return this.cartData.reduce((total: number, item: any) => {
    // Tính discountedPrice ngay trước khi thêm vào tổng
    const itemTotal = item.product_id.price * item.qty;
    const discountedPrice = (total + itemTotal > 50000000)
      ? itemTotal * 0.95 // Giảm 5% nếu tổng giá trị sản phẩm lớn hơn 50,000,000
      : itemTotal;

    return total + discountedPrice;
    }, 0);
  }




getDiscountPrice(): number {
  return this.cartData.reduce((total: any, item: any) => {
    const itemDiscountPrice = (item.total > 20000000) ? (item.total * 0.05) : 0;
    return total + itemDiscountPrice;
  }, 0);
}



  edit(idOder: any) {
    // Kiểm tra xem cartData có dữ liệu không
    if (this.cartData.length > 0) {
      const userId = idOder[0].users_id.id; // Lấy giá trị của userId
      // Tạo đối tượng newProduct với thông tin đã lấy
      const newProduct = {
        order_name: this.checkoutForm.value.order_name,
        order_gender: this.checkoutForm.value.order_gender,
        order_phone: this.checkoutForm.value.order_phone,
        order_city: this.checkoutForm.value.order_city,
        order_district: this.checkoutForm.value.order_district,
        order_wards: this.checkoutForm.value.order_wards,
        order_street: this.checkoutForm.value.order_street,
        note: this.checkoutForm.value.note,
        total: this.getTotalPrice(),
        userId: userId,
        paymentMethodId: this.selectedPaymentMethod,
      };
      console.log("🚀 ~ CheckoutComponent ~ newProduct:", newProduct)



      // Gọi API thêm đơn hàng
      this.orderdetailService.addOrderProductDetails(newProduct).subscribe((res:any) => {
      }, (err) => {
        switch(err?.error?.text) {
          case "inserted": {
            this.toastService.show("Đặt hàng thành công");
            this.router.navigate(['/thankyou']);
            break;
          }
        }
      });
    }
  }


}

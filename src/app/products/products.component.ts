import {  Component, OnInit } from '@angular/core';
import { product } from '../model/product.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  categoryId: string = '';
  categoryData: any = {};
  brands: any;
  selectedBrandName: any;

  // Khai báo categoryData (kiểu dữ liệu có thể thay đổi tùy thuộc vào dữ liệu thực tế)


  rangeValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;

  paginationLength: number = 0;

  // products: product[] = [];
  products: any;
  productsOriginal: product[] = [];
  productsPage: product[] = [];

  pageCurrent: number = 1;
  productArrayFilter: number = 6;
  totalItems: number = 0;

  currentUser: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private toastService: ToastService,

    public loadingService: LoadingService
  ){ }


  ngOnInit(): void {
    this.loadingService.showLoading();
    // const token = this.cookieService.get('token');
    // if(token) {
    //   this.currentUser = jwt_decode(token);
    // }
    this.getBrand();
    this.getProducts();
  }

  getBrand() {
    return this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data;
    })
  }



  // Hàm để lọc sản phẩm theo thương hiệu
  getProductByBrandAndCate() {
    this.loadingService.showLoading();

    // Kiểm tra xem có tên thương hiệu được chọn không
    if (this.selectedBrandName) {
    console.log("🚀 ~ ProductsComponent ~ selectedBrandName:", this.selectedBrandName)

      const brandParams: {} = {
        name: this.selectedBrandName,
      };

      // Gọi service để lấy sản phẩm theo thương hiệu và danh mục
      this.productService.getByBrand(brandParams).subscribe((data) => {
        this.products = data as product[];
        this.productsOriginal = this.products;
        this.totalItems = this.products.length;
        this.loadingService.hideLoading();
      });
    }
  }




  // addToCart(product: any) {
  //   const cart = {
  //     userid: this.currentUser.id,
  //     productid: product.id,
  //     quantity: 1
  //   }

  //   this.cartService.add(cart).subscribe(res => {
  //   }, (err) => {
  //     switch(err?.error?.text) {
  //       case 'inserted': {
  //         this.cartService.oncartChange(err?.error?.text);
  //         this.toastService.show(`Added ${product?.title} to the cart!`);
  //         break;
  //       }
  //     }
  //   })
  // }

  onRangeChange() {
    this.maxValue = this.rangeValue;
  }

  onMaxChange() {
    this.rangeValue = this.maxValue;
  }

  filterPrice() {
    this.products = this.productsOriginal.filter((product: any) => product.price >= this.minValue && product.price <= this.maxValue);
    this.totalItems = this.products?.length;
  }

  clearFilter() {
    this.products = this.productsOriginal;
    this.totalItems = this.products?.length;
    this.rangeValue = 0;
    this.maxValue = 0;
    this.minValue = 0;
  }

  getProducts() {
    this.loadingService.showLoading();
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data as product[];
      this.productsOriginal = this.products;
      this.totalItems = this.products?.length;
      this.loadingService.hideLoading();
    })
  }

  arrayFromNumber(num: number) {
    return Array.from({length: num}, (_, i) => i);
  }

  formatTitle(title: any): string {
    if(title?.length <= 31) {
      return title;
    }

    return title?.slice(0, 32) + '...';
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }
}

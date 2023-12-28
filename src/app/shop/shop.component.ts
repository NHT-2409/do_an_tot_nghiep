import { Component, OnInit } from '@angular/core';
import { product } from '../model/product.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { category } from '../model/category.model';
import { BrandService } from '../service/brand.service';
import { Data } from '@uploadcare/blocks';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  categoryId: string = '';
  brands: any;
  selectedBrandId: any;

  // Khai báo categoryData (kiểu dữ liệu có thể thay đổi tùy thuộc vào dữ liệu thực tế)
  categoryData: any;

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

  currentUser: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    // private cartService: CartService,
    private toastService: ToastService,
    // private cookieService: CookieService,
    public loadingService: LoadingService,
    public brandService: BrandService,
  ) { }

  ngOnInit() {
    this.loadingService.showLoading();
    // const token = this.cookieService.get('token');
    // if(token) {
    //   this.currentUser = jwt_decode(token);
    // }

    return this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];

      this.categoryService.getById(this.categoryId)
      .subscribe((data: category) => {
        this.categoryData = data;
        this.getProducts();
        this.getBrand();
      });
    });

  }

  getProductByBrandAndCate() {
    this.loadingService.showLoading();
    // Sử dụng this.selectedBrandId và this.categoryData?.id ở đây để lấy giá trị brand và category và thực hiện các thao tác cần thiết
    const brandId = this.selectedBrandId;
    const categoryId = this.categoryData?.id;

    // Gọi hàm xử lý với brandId và categoryId
    this.productService.getProductsByBrandAndCategory(brandId, categoryId).subscribe((data) => {
      this.products = data;
      this.totalItems = this.products.length;
      this.loadingService.hideLoading();
    })
  }

  onRangeChange() {
    this.maxValue = this.rangeValue;
  }

  onMaxChange() {
    this.rangeValue = this.maxValue;
  }

  filterPrice() {
    this.products = this.productsOriginal.filter((product: any) => product.price >= this.minValue && product.price <= this.maxValue);
    this.totalItems = this.products.length;
  }

  clearFilter() {
    this.products = this.productsOriginal;
    this.totalItems = this.products.length;
    this.rangeValue = 0;
    this.maxValue = 0;
    this.minValue = 0;
  }

  getProducts() {
    this.loadingService.showLoading();
    const categoryParam: {} = {
      name: this.categoryData.name,
    }

    this.productService.getByCategory(categoryParam).subscribe((data) => {
      this.products = data as product[];
      this.productsOriginal = this.products;
      this.totalItems = this.products.length;
      this.loadingService.hideLoading();
    })
    console.log("🚀 ~ ShopComponent ~ products:", this.products)

  }

  getBrand() {
    return this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data;
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

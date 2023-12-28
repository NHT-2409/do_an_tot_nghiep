import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { category } from '../model/category.model';
import { product } from '../model/product.model';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { LoadingService } from '../service/loading.service';
import { NewsService } from '../service/news.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: any;

  isProductSession: boolean = false;
  category: any;
  data: category[]=[];
  visibleProducts: product[] = [];
  products: product[] = [];

  @Output() clickCategoryEvent = new EventEmitter<string>();

  constructor(
    private newsService: NewsService,
    private categoryList: CategoryService,
    private productService: ProductService,
    private router: Router,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getCatagory();
    this.getProducts();
    this.getNews();
  }

  navigateToDescription(newsId: number): void {
    // Dùng Router để điều hướng tới trang news-description với tham số là ID của tin tức
    this.router.navigate(['/news-description', newsId]);
  }


  getNews(){
    this.newsService.getAllNews().subscribe((data) =>  {
      this.news = data;
    })
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }

  getProducts() {
    this.loadingService.showLoading();


    this.productService.getAllProducts().subscribe((data) => {
      this.products = data as product[];
      this.loadingService.hideLoading();
    })
  }

  getCatagory() {
    this.loadingService.showLoading();

    this.productService.getAllProducts().subscribe((data) => {
      this.products = data as product[];

      // Giới hạn số lượng sản phẩm hiển thị (ví dụ, 14 sản phẩm)
      this.visibleProducts = this.products.slice(0, 14);

      this.loadingService.hideLoading();
    });
  }

  onCategoryChange(value: any) {
    this.category = value;
    this.isProductSession = true;
  }

}



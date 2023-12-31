import { Component, OnInit } from '@angular/core';
import { NavItems } from '../constants/admin.constant';
import { UserService } from 'src/app/service/user.service';
import { CategoryService } from 'src/app/service/category.service';
import { combineLatest } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { BrandService } from 'src/app/service/brand.service';
import { NewsService } from 'src/app/service/news.service';
import { OrderService } from 'src/app/service/order.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly NAV_ITEM = NavItems;
  status: boolean = false;
  sessison: string = this.NAV_ITEM.Dashboard;
  title: string = this.NAV_ITEM.Dashboard;

  userTotal: any = 0;
  categoryTotal: any = 0;
  productTotal: any = 0;
  brandTotal: any = 0;
  newsTotal: any = 0;
  storeTotal: any = 0;
  orderTotal: any = 0;



  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private newsService: NewsService,
    private orderService: OrderService,
    private storeService: StoreService,
    private loadingService: LoadingService,
    private authService: AuthServiceService,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  logOut() {
    this.authService.logout(); // Gọi phương thức logout từ AuthService
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
    this.toastService.show('Logout successfully!');
  }

  getData() {
    combineLatest([
      this.userService.getTotal(),
      this.categoryService.getTotal(),
      this.productService.getTotal(),
      this.brandService.getTotal(),
      this.orderService.getTotal(),
      this.newsService.getTotal(),
      this.storeService.getTotal(),

    ]).subscribe(([userTotal, categoryTotal, productTotal, brandTotal, newsTotal, orderTotal,storeTotal ]) => {
      this.userTotal = userTotal;
      this.categoryTotal = categoryTotal;
      this.productTotal = productTotal;
      this.brandTotal = brandTotal;
      this.newsTotal = newsTotal;
      this.orderTotal = orderTotal;
      this.storeTotal = storeTotal;
    })
  }

  navigate(session: string) {
    switch(session) {
      case this.NAV_ITEM.ManageUsers: {
        this.onChangeSession(this.NAV_ITEM.ManageUsers);
        break;
      }
      case this.NAV_ITEM.ManageCategories: {
        this.onChangeSession(this.NAV_ITEM.ManageCategories);
        break;
      }
      case this.NAV_ITEM.ManageProducts: {
        this.onChangeSession(this.NAV_ITEM.ManageProducts);
        break;
      }
      case this.NAV_ITEM.ManageBrands: {
        this.onChangeSession(this.NAV_ITEM.ManageBrands);
        break;
      }
      case this.NAV_ITEM.ManageNews: {
        this.onChangeSession(this.NAV_ITEM.ManageNews);
        break;
      }
      case this.NAV_ITEM.ManageStores: {
        this.onChangeSession(this.NAV_ITEM.ManageStores);
        break;
      }
      case this.NAV_ITEM.ManageOrder: {
        this.onChangeSession(this.NAV_ITEM.ManageOrder);
        break;
      }
      case this.NAV_ITEM.ManageStatistical: {
        this.onChangeSession(this.NAV_ITEM.ManageStatistical);
        break;
      }
    }
  }

  addToggle() {
    this.status = !this.status;
  }

  onChangeSession(session: string): void {
    this.sessison = session;
    this.title = session;
    this.getData();
  }
}

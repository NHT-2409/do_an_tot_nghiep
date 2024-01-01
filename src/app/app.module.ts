import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatIconModule} from '@angular/material/icon';

import {MatBadgeModule} from '@angular/material/badge';


import { MatSnackBarModule } from '@angular/material/snack-bar';


import { DashboardComponent } from './admin/dashboard/dashboard.component';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialogModule } from '@angular/material/dialog';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageUsersAddComponent } from './admin/manage-users/manage-users-add/manage-users-add.component';
import { ManageUsersEditComponent } from './admin/manage-users/manage-users-edit/manage-users-edit.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { CategoryComponent } from './category/category.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { ProductsComponent } from './products/products.component';
import { SingleComponent } from './single/single.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ManageProductsAddComponent } from './admin/manage-products/manage-products-add/manage-products-add.component';
import { ManageProductsEditComponent } from './admin/manage-products/manage-products-edit/manage-products-edit.component';
import { ImageViewComponent } from './image-view/image-view.component';


import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManageCategoriesAddComponent } from './admin/manage-categories/manage-categories-add/manage-categories-add.component';
import { ManageCategoriesEditComponent } from './admin/manage-categories/manage-categories-edit/manage-categories-edit.component';
import { ManageBrandsComponent } from './admin/manage-brands/manage-brands.component';
import { ManageStoresComponent } from './admin/manage-stores/manage-stores.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { ManageBrandsAddComponent } from './admin/manage-brands/manage-brands-add/manage-brands-add.component';
import { ManageBrandsEditComponent } from './admin/manage-brands/manage-brands-edit/manage-brands-edit.component';
import { ManageNewsAddComponent } from './admin/manage-news/manage-news-add/manage-news-add.component';
import { ManageNewsEditComponent } from './admin/manage-news/manage-news-edit/manage-news-edit.component';
import { LoadingComponent } from './loading/loading.component';
import { CartComponent } from './cart/cart.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { ManageOrderShowComponent } from './admin/manage-order/manage-order-show/manage-order-show.component';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BillingComponent } from './user-profile/billing/billing.component';
import { BillingDetailComponent } from './user-profile/billing/billing-detail/billing-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    CheckoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageCategoriesComponent,
    ManageUsersAddComponent,
    ManageUsersEditComponent,
    ConfirmDialogComponent,
    CategoryComponent,
    PricecomComponent,
    ProductsComponent,
    SingleComponent,
    ThankyouComponent,
    ManageProductsAddComponent,
    ManageProductsEditComponent,
    ImageViewComponent,
    ManageCategoriesAddComponent,
    ManageCategoriesEditComponent,
    ManageBrandsComponent,
    ManageStoresComponent,
    ManageNewsComponent,
    ManageBrandsAddComponent,
    ManageBrandsEditComponent,
    ManageNewsAddComponent,
    ManageNewsEditComponent,
    LoadingComponent,
    CartComponent,
    ManageOrderComponent,
    ManageOrderShowComponent,
    UserProfileComponent,
    BillingComponent,
    BillingDetailComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

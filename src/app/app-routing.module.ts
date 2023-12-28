import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CheckoutComponent } from './checkout/checkout.component';

import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUsersEditComponent } from './admin/manage-users/manage-users-edit/manage-users-edit.component';
import { ManageUsersAddComponent } from './admin/manage-users/manage-users-add/manage-users-add.component';
import { ProductsComponent } from './products/products.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { SingleComponent } from './single/single.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './service/cart.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { BillingComponent } from './user-profile/billing/billing.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'products', component: ProductsComponent},
  { path: 'refresh', component: CartComponent },
  { path: 'shop/:id', component: ShopComponent },

  {path: 'pricecom', component: PricecomComponent},
  {path: 'single', component: SingleComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'checkout', component: CheckoutComponent},


  { path: 'orders-list', component: BillingComponent },
  { path: 'user-info', component: UserProfileComponent },
  { path: '', redirectTo: '/user-info', pathMatch: 'full' },

  {path: 'home/products', component: ProductsComponent},
  {path: 'home/products/:category', component: ProductsComponent},

  {path: 'admin', children: [
    {path: '', component: DashboardComponent},
    {path: 'edit/:id', component: ManageUsersEditComponent},
    {path: 'add', component: ManageUsersAddComponent}
  ]},

  {path: '**', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

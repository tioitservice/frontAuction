import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SoldProductComponent } from './sold-product/sold-product.component';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UnsoldProductComponent } from './unsold-product/unsold-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAvailableProductComponent } from './user-available-product/user-available-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'sold-products', component: SoldProductComponent },
  { path: 'unsold-products', component: UnsoldProductComponent },
  { path: 'available-products', component: AvailableProductsComponent },
  { path: 'user-available-product', component: UserAvailableProductComponent },
  { path: '', component: DashboardComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

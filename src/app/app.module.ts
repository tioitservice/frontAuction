import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SoldProductComponent } from './sold-product/sold-product.component';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UnsoldProductComponent } from './unsold-product/unsold-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from './modal/modal.component';
import { UserAvailableProductComponent } from './user-available-product/user-available-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AddProductComponent,
    SoldProductComponent,
    AvailableProductsComponent,
    ProductDetailComponent,
    UnsoldProductComponent,
    DashboardComponent,
    ModalComponent,
    UserAvailableProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

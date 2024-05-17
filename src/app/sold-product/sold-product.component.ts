import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sold-product',
  templateUrl: './sold-product.component.html',
  styleUrls: ['./sold-product.component.css']
})
export class SoldProductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private subscriptions: Subscription = new Subscription();
  private isBrowser: boolean;
  userId: any;
  constructor(
    private apiService: ApiserviceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.fetchSoldProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchSoldProducts(): void {
   
    if (this.isBrowser) {
      try {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
          console.error('User not logged in or invalid user data');
          return;
        }

        const fetchSub = this.apiService.getSoldProducts(this.userId).subscribe(response => {
          if (response.success) {
            this.products = response.products;
          } else {
            console.error('Failed to fetch sold products');
          }
        }, error => {
          console.error('Error fetching sold products', error);
        });

        this.subscriptions.add(fetchSub);
      } catch (error) {
        console.error('Error accessing user data from local storage', error);
      }
    } else {
      console.error('localStorage is not available in this environment');
    }
  }
}

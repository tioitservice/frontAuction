import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-unsold-product',
  templateUrl: './unsold-product.component.html',
  styleUrl: './unsold-product.component.css'
})
export class UnsoldProductComponent implements OnInit, OnDestroy {
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

        const fetchSub = this.apiService.getUnSoldProducts(this.userId).subscribe(response => {
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

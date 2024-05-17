import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'] 
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: any;
  product: any;
  bidAmount: any;
  responseMessage: string | undefined;
  timeLeft: string = '';
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.fetchProductDetail();
    });

    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      // this.updateTimer();
    });

    setInterval(() => {
      window.location.reload();
    }, 30000); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchProductDetail(): void {
    this.apiService.getPoductDetail(this.productId).subscribe(response => {
      if (response.success) {
        this.product = response.product;
        // this.updateTimer();  
      } else {
        console.error('Failed to fetch product details');
      }
    }, error => {
      console.error('Error fetching product detail', error);
    });
  }
  
  placeBid(): void {
    const userIdString = localStorage.getItem('userId');
    if (userIdString === null) {
      console.error('User not logged in');
      return;
    }

    const userId = Number(userIdString);
    if (isNaN(userId)) {
      console.error('Invalid user ID');
      return;
    }

    this.apiService.placeBid(this.productId, userId, this.bidAmount).subscribe(response => {
      this.responseMessage = response.responseMessage;
      if (response.success) {
        console.log('Bid placed successfully');
        this.fetchProductDetail();
      } else {
        console.error('Failed to place bid');
      }
    }, error => {
      this.responseMessage = error.error.responseMessage;
      console.error('Error placing bid', error);
    });
  }

  // updateTimer(): void {
  //   if (!this.product || !this.product.endDate) {
  //     return;
  //   }

  //   const endTime = new Date(this.product.endDate).getTime();
  //   const now = new Date().getTime();
  //   const distance = endTime - now;

  //   if (distance < 0) {
  //     this.timeLeft = 'Expired';
  //   } else {
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     this.timeLeft = `${hours}h ${minutes}m ${seconds}s`;
  //   }
  // }
}

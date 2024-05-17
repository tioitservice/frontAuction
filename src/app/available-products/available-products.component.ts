import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.css']  
})
export class AvailableProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private productService: ApiserviceService) { }

  ngOnInit(): void {
    this.productService.getAvailableProducts().subscribe(
      data => {
        if (data.success) {
          this.products = data.products;
          this.startTimers();
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
    setInterval(() => {
      window.location.reload();
    }, 30000); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startTimers(): void {
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.products.forEach(product => {
        this.updateTimer(product);
      });
    });
  }

  updateTimer(product: { endDate: number, timeLeft: string }): void {
    const now = new Date().getTime();
    const distance = product.endDate - now;

    if (distance < 0) {
      product.timeLeft = 'Expired';
    } else {
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      product.timeLeft = `${hours}h ${minutes}m ${seconds}s`;
    }
  }
}

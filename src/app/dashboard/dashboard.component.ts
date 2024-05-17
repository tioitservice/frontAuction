import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  isLoggedIn = false;
  showModal = false;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');
    this.fetchAvailableProducts();
  }

  fetchAvailableProducts(): void {
    this.apiService.getAvailableProducts().subscribe(response => {
      if (response.success) {
        this.products = response.products;
      } else {
        console.error('Failed to fetch available products');
      }
    }, error => {
      console.error('Error fetching available products', error);
    });
  }

  handleProductClick(productId: number): void {
    if (!this.isLoggedIn) {
      this.showModal = true;
    } else {
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  goToLogin(): void {
    this.closeModal();
    this.router.navigate(['/login']);
  }
}
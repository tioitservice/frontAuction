import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showModal = false;
  username: string = '';
  walletAmount: number = 0;

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('walletAmount');
    localStorage.removeItem('userDetail');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadUserData();
  }

  loadUserData(): void {
    const username = localStorage.getItem('username');
    const walletAmount = localStorage.getItem('walletAmount');

    if (username && walletAmount !== null) {
      this.username = username;
      this.walletAmount = parseFloat(walletAmount);
    }
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('userId');
      this.loadUserData();
    }
  }
}

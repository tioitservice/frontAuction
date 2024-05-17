import { Component, Output, EventEmitter } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  amount: number = 0;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiserviceService) { }

  closeModal(): void {
    this.close.emit();
  }

  addFunds(): void {
    const userIdStr = localStorage.getItem('userId');
    const walletAmountStr = localStorage.getItem('walletAmount');
  
    if (!userIdStr || !walletAmountStr) {
      console.error('User data not found in local storage');
      return;
    }
  
    const userId = parseInt(userIdStr, 10);
    const walletAmount = parseFloat(walletAmountStr);
  
    const updatedWalletAmount = walletAmount + this.amount;
  
    this.apiService.updateWalletAmount(userId, updatedWalletAmount).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem('walletAmount', updatedWalletAmount.toString());
          alert('Wallet updated successfully!');
          this.closeModal();
        } else {
          alert(response.responseMessage);
        }
      },
      error => {
        console.error('Error updating wallet', error);
      }
    );
  }
  
}

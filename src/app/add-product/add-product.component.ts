import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
productData = { name: '', description: '', price: 0, endDate: '' };
  responseMessage: string = '';

  constructor(private apiService: ApiserviceService) { }

  onSubmit() {
    const userIdString = localStorage.getItem('userId');
    if (userIdString===null) {
      this.responseMessage=='User not logged in';
      return;
    }

    const userId = Number(userIdString);
    if (isNaN(userId)) {
      this.responseMessage==='Invalid user ID';
      return;
    }

    const endDateEpoch = new Date(this.productData.endDate).getTime();
    const product = {
      ...this.productData,
      endDate:  endDateEpoch,
      sellerId: userId
    };

    this.apiService.addProduct(product).subscribe(response => {
      console.log('Product added', response);
      this.responseMessage = response.responseMessage;
    }, error => {
      console.error('Error adding product', error);
      this.responseMessage = 'Failed to add product. Please try again.';
    });
  }
}
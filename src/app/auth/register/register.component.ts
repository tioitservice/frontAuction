import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = { username: '', password: '' };
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(private apiService: ApiserviceService) { }

  onSubmit() {
    this.apiService.registerUser(this.registerData).subscribe(response => {
      console.log('Registration successful', response);
      this.responseMessage = response.responseMessage;
      this.isSuccess = response.success;
    }, error => {
      console.error('Registration failed', error);
      this.responseMessage = 'Registration failed. Please try again.';
      this.isSuccess = false;
    });
  }
}

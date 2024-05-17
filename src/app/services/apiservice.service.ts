import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private baseUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) { }

  registerUser(data: { username: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/register`, data);
  }

  loginUser(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/login`, data);
  }
  addProduct(data: { name: string; description: string; price: number; endDate: number; sellerId: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/product/add`, data);
  }
  getAvailableProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/fetch/all?status=Available`);
  }
  getPoductDetail(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/fetch?productId=${productId}`);
  }
  placeBid(productId: number, userId: number, amount: number): Observable<any> {
    const bidData = { productId, userId, amount };
    return this.http.post<any>(`${this.baseUrl}/product/offer/add`, bidData);
  }
  getSoldProducts(sellerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/fetch/seller-wise?sellerId=${sellerId}&status=Sold`);
  }
  getUnSoldProducts(sellerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/fetch/seller-wise?sellerId=${sellerId}&status=UnSold`);
  }
  getUserAvailableProducts(sellerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/fetch/seller-wise?sellerId=${sellerId}&status=Available`);
  }
  updateWalletAmount(userId: number, walletAmount: number): Observable<any> {
    const payload = { id: userId, walletAmount: walletAmount };
    return this.http.put<any>(`${this.baseUrl}/user/update/wallet`, payload);
  }
}
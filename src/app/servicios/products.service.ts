import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url = "http://127.0.0.1:8000/api";
  http = inject(HttpClient);

  constructor() { }
  getProducts() {
    return this.http.get(`${this.url}/products`);
  }
  deleteProduct(productId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/products/${productId}`, { headers });
  }
  createProduct(product: FormData) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/products`, product, { headers });
  }

}

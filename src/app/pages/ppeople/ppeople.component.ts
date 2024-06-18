import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../servicios/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ppeople',
  standalone: true,
  providers: [ProductsService, AuthService],
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './ppeople.component.html',
  styleUrl: './ppeople.component.scss'
})
export class PpeopleComponent {
  products: any = [];
  isAdmin: boolean = false;
  constructor(private productsService: ProductsService, private authService: AuthService) {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
  ngOnInit(): void {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter((product: any) => product.id !== productId);
      });
    }
  }
}

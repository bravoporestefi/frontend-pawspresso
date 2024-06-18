import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../servicios/products.service';
import { AuthService } from '../../servicios/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pcat',
  standalone: true,
  providers: [ProductsService, AuthService],
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './pcat.component.html',
  styleUrls: ['./pcat.component.scss']
})
export class PcatComponent implements OnInit {
  products: any = [];
  isAdmin: boolean = false;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
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

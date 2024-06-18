import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../servicios/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ppeople',
  standalone: true,
  providers: [ProductsService],
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './ppeople.component.html',
  styleUrl: './ppeople.component.scss'
})
export class PpeopleComponent {
  products: any = [];
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
}

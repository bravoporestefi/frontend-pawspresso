import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../servicios/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pcat',
  standalone: true,
  providers: [ProductsService],
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './pcat.component.html',
  styleUrl: './pcat.component.scss'
})
export class PcatComponent {
  products: any = [];
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
}

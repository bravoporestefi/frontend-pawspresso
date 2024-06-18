import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../servicios/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [ProductsService],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      supplier: ['', Validators.required],
      image: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });

      this.productsService.createProduct(formData).subscribe(
        response => {
          console.log('Product created successfully', response);
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Product creation error', error);
        }
      );
    }
  }
}

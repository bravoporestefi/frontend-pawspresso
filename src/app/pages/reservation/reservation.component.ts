import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { ReservationService } from '../../servicios/reservation.service';
import { ProductsService } from '../../servicios/products.service';
import { EventsService } from '../../servicios/events.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  providers: [AuthService, ReservationService, ProductsService, EventsService],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  showProductList: boolean = false;
  showEventList: boolean = false;
  formError: boolean = false;
  formErrorMessage: string = '';
  products: any[] = [];
  events: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reservationService: ReservationService,
    private productsService: ProductsService,
    private eventsService: EventsService,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.reservationForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      product: [''],
      event: [''],
      user_id: ['']
    });
  }

  ngOnInit(): void {
    this.reservationForm.get('type')?.valueChanges.subscribe(value => {
      this.toggleProductList(value);
    });

    this.loadProducts();
    this.loadEvents();
  }

  toggleProductList(type: string) {
    this.showProductList = type === 'product';
    this.showEventList = type === 'event';
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((products: any) => {
      this.products = products;
    });
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe((events: any) => {
      this.events = events;
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.authService.getUserId().subscribe(userId => {
        if (userId) {
          console.log(userId)
          const reservationData = { ...this.reservationForm.value, user_id: userId };
          this.reservationService.createReservation(reservationData).subscribe(
            response => {
              console.log('Reservation created successfully', response);
              this.formError = false;
              this.router.navigate(['/reservationconfirmation']);
            },
            error => {
              console.error('Reservation error', error);
              this.formError = true;
              this.formErrorMessage = 'Error al crear la reserva. Inténtalo de nuevo.';
            }
          );
        } else {
          this.formError = true;
          this.formErrorMessage = 'No se pudo obtener el ID del usuario. Inténtalo de nuevo.';
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { ReservationService } from '../../servicios/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  providers: [AuthService, ReservationService],
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reservationService: ReservationService,
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
  }

  toggleProductList(type: string) {
    this.showProductList = type === 'producto';
    this.showEventList = type === 'evento';
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const userId = this.authService.getUserId();
      if (userId) {
        const reservationData = { ...this.reservationForm.value, user_id: userId };
        this.reservationService.createReservation(reservationData).subscribe(
          response => {
            console.log('Reservation created successfully', response);
            this.formError = false;
            this.router.navigate(['/home']);
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
    }
  }


}

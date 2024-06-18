import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [AuthService],
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordMismatch: boolean = false;
  emailExists: boolean = false;
  phoneNumberExists: boolean = false;
  formError: boolean = false;
  formErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.signupForm.valueChanges.subscribe(() => {
      this.passwordMismatch = this.signupForm.get('password')?.value !== this.signupForm.get('password_confirmation')?.value;
    });
  }

  onSubmit() {
    if (this.signupForm.valid && !this.passwordMismatch) {
      const userData = this.signupForm.value;
      this.authService.register(userData).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.emailExists = false;
          this.phoneNumberExists = false;
          this.formError = false;
          this.router.navigate(['/login']);
        },
        error => {
          console.log(userData);
          console.error('Registration error', error);
          if (error.status === 422) {
            this.formError = true;
            this.formErrorMessage = 'El correo electrónico o el teléfono ya existen';
          }
        }
      );
    }
  }
}

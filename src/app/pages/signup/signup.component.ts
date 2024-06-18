import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [AuthService],
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordMismatch: boolean = false;

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
    if (this.signupForm.valid) {
      const { password_confirmation, ...userData } = this.signupForm.value;
      this.authService.register(this.signupForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
  }
}

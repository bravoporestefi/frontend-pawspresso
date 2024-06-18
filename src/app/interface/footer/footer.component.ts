import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  providers: [AuthService],
  imports: [HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logOut() {
    this.authService.logout();
  }
}

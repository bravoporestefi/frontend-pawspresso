import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  providers: [AuthService],
  imports: [HttpClientModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      console.log(this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    }
  }
  toggleProductList(event: Event): void {
    const typeElement = event.target as HTMLSelectElement;
    const productList = document.getElementById('productList') as HTMLDivElement;
    const eventList = document.getElementById('eventList') as HTMLDivElement;

    if (typeElement && productList && eventList) {
      const type = typeElement.value;
      productList.style.display = (type === 'producto') ? 'block' : 'none';
      eventList.style.display = (type === 'evento') ? 'block' : 'none';
    }
  }
}

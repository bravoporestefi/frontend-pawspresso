import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
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

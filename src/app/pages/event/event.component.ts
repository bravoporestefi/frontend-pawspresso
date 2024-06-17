import { Component, LOCALE_ID } from '@angular/core';
import { EventsService } from '../../servicios/events.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RouterLink } from '@angular/router';

registerLocaleData(localeEs, 'es-ES');

@Component({
  selector: 'app-event',
  standalone: true,
  providers: [EventsService, { provide: LOCALE_ID, useValue: 'es-ES' }],
  imports: [HttpClientModule, CommonModule, DatePipe, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  events: any = [];
  constructor(private eventsService: EventsService) {
    this.eventsService.getEvents().subscribe((events) => {
      this.events = events;
    })
  }
}

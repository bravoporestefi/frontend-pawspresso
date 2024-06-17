import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly url = "http://127.0.0.1:8000/api";
  http = inject(HttpClient);

  constructor() { }
  getEvents() {
    return this.http.get(`${this.url}/events`);
  }
  getEventByID(id: number) {
    return this.http.get(`${this.url}/events/${id}`);
  }
  deleteEventByID(id: number) {
    return this.http.delete(`${this.url}/events/${id}`);
  }
}

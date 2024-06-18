import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private readonly url = "http://127.0.0.1:8000/api";
  http = inject(HttpClient);

  constructor() { }
  getCats() {
    return this.http.get(`${this.url}/cats`);
  }
}
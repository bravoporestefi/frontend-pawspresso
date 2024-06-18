import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    console.log(localStorage.getItem('token'));

    return !!localStorage.getItem('token');
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/home']);
      })
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  getUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser?.id || null;
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        return null;
      }
    } else {
      console.error('No user found or user is invalid in localStorage');
      return 1;
    }
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe(
        () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.isLoggedInSubject.next(false);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout error', error);
        }
      );
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLoggedInSubject.next(false);
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}

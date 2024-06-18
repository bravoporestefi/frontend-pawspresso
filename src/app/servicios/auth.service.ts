import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  isAdmin(): Observable<boolean> {
    return this.getUser().pipe(
      map(user => !!user?.is_admin),
      catchError(() => of(false))
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

  getUserId(): Observable<number | null> {
    return this.getUser().pipe(
      map(user => user?.id || null),
      catchError(() => of(null))
    );
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

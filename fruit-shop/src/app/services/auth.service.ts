import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router'; // Will be used for redirects later

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    // Pre-defined user for testing
    { id: 1, username: 'TestUser', email: 'test@example.com', password: 'password123' }
  ];
  private nextUserId = 2;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    // Check local storage for persisted login state (optional, for basic persistence)
    this.loadInitialAuthState();
  }

  private loadInitialAuthState(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login(credentials: { email?: string, password?: string }): Observable<User> {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      // Never store the actual password in the currentUserSubject or localStorage
      const { password, ...userWithoutPassword } = user;
      this.currentUserSubject.next(userWithoutPassword);
      this.isLoggedInSubject.next(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword)); // Basic persistence
      return of(userWithoutPassword);
    } else {
      return throwError(() => new Error('Invalid email or password'));
    }
  }

  signup(userInfo: { username: string, email: string, password?: string }): Observable<User> {
    if (this.users.find(u => u.email === userInfo.email)) {
      return throwError(() => new Error('Email already exists'));
    }
    if (this.users.find(u => u.username === userInfo.username)) {
      return throwError(() => new Error('Username already exists'));
    }

    const newUser: User = {
      id: this.nextUserId++,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password // Stored temporarily, should be hashed in a real app
    };
    this.users.push(newUser);

    // Log in the new user immediately
    const { password, ...userWithoutPassword } = newUser;
    this.currentUserSubject.next(userWithoutPassword);
    this.isLoggedInSubject.next(true);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword)); // Basic persistence

    console.log('Current users in memory:', this.users); // For debugging
    return of(userWithoutPassword);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']); // Navigate to home or login page after logout
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}

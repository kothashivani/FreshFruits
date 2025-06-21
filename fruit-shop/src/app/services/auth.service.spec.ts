import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For routerLink directives
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  const testUser: User = { id: 1, username: 'TestUser', email: 'test@example.com', password: 'password123' };
  const testUserNoPass: User = { id: 1, username: 'TestUser', email: 'test@example.com' };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // For router.navigate in logout
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);

    // Reset localStorage and service state before each test
    localStorage.removeItem('currentUser');
    // Manually reset internal state of the service as it's a singleton
    service['currentUserSubject'].next(null);
    service['isLoggedInSubject'].next(false);
    service['users'] = [{ ...testUser }]; // Reset users array for predictable tests
    service['nextUserId'] = 2;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should log in a user with correct credentials', (done) => {
      service.login({ email: 'test@example.com', password: 'password123' }).subscribe(user => {
        expect(user).toEqual(testUserNoPass); // Password should be stripped
        expect(service.getCurrentUser()).toEqual(testUserNoPass);
        service.isLoggedIn$.subscribe(isLoggedIn => {
          expect(isLoggedIn).toBeTrue();
          done();
        });
      });
    });

    it('should not log in with incorrect password', (done) => {
      service.login({ email: 'test@example.com', password: 'wrongpassword' }).subscribe({
        next: () => fail('should have failed with wrong password'),
        error: (err) => {
          expect(err.message).toContain('Invalid email or password');
          expect(service.getCurrentUser()).toBeNull();
          service.isLoggedIn$.subscribe(isLoggedIn => {
            expect(isLoggedIn).toBeFalse();
            done();
          });
        }
      });
    });
  });

  describe('signup', () => {
    it('should sign up a new user and log them in', (done) => {
      const newUserInfo = { username: 'NewUser', email: 'new@example.com', password: 'newpassword' };
      service.signup(newUserInfo).subscribe(user => {
        expect(user.username).toBe(newUserInfo.username);
        expect(user.email).toBe(newUserInfo.email);
        expect(user.id).toBe(2); // nextUserId was 2
        expect(service.getCurrentUser()?.email).toBe(newUserInfo.email);
        service.isLoggedIn$.subscribe(isLoggedIn => {
          expect(isLoggedIn).toBeTrue();
          done();
        });
      });
    });

    it('should not sign up if email already exists', (done) => {
      service.signup({ username: 'AnotherUser', email: 'test@example.com', password: 'password' }).subscribe({
        next: () => fail('should have failed due to existing email'),
        error: (err) => {
          expect(err.message).toContain('Email already exists');
          done();
        }
      });
    });
  });

  describe('logout', () => {
    it('should log out a user', (done) => {
      // First, log in
      service.login({ email: 'test@example.com', password: 'password123' }).subscribe(() => {
        service.logout();
        expect(service.getCurrentUser()).toBeNull();
        service.isLoggedIn$.subscribe(isLoggedIn => {
          expect(isLoggedIn).toBeFalse();
          expect(localStorage.getItem('currentUser')).toBeNull();
          done();
        });
      });
    });
  });

  describe('loadInitialAuthState', () => {
    it('should load user from localStorage if present', () => {
      localStorage.setItem('currentUser', JSON.stringify(testUserNoPass));
      // Re-initialize service to trigger constructor logic or manually call loadInitialAuthState
      // For this test, we can check the state after manual call or re-injection if easy
      service['loadInitialAuthState'](); // Accessing private method for test - consider alternatives

      expect(service.getCurrentUser()).toEqual(testUserNoPass);
      service.isLoggedIn$.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeTrue();
      });
    });
  });
});

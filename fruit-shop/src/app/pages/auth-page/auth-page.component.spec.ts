import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthPageComponent } from './auth-page.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Mock AuthService
class MockAuthService {
  login = jasmine.createSpy('login').and.returnValue(of({ username: 'Test', email: 'test@example.com' }));
  signup = jasmine.createSpy('signup').and.returnValue(of({ username: 'New', email: 'new@example.com' }));
}

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let authService: MockAuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Spy on router navigation
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login Form', () => {
    it('should call authService.login on valid submission', () => {
      component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
      component.onLoginSubmit();
      expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    });

    it('should navigate to home on successful login', fakeAsync(() => {
      component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
      component.onLoginSubmit();
      tick(1000); // For setTimeout
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should display error message on failed login', () => {
      authService.login.and.returnValue(throwError(() => new Error('Invalid credentials')));
      component.loginForm.setValue({ email: 'test@example.com', password: 'wrong' });
      component.onLoginSubmit();
      expect(component.errorMessage).toBe('Invalid credentials');
    });
  });

  describe('Signup Form', () => {
    beforeEach(() => {
      component.toggleMode(); // Switch to signup mode
      fixture.detectChanges();
    });

    it('should call authService.signup on valid submission', () => {
      component.signupForm.setValue({ username: 'NewUser', email: 'new@example.com', password: 'password123', confirmPassword: 'password123' });
      component.onSignupSubmit();
      const { confirmPassword, ...expectedSignupData } = component.signupForm.value;
      expect(authService.signup).toHaveBeenCalledWith(expectedSignupData);
    });

    it('should display error if passwords do not match', () => {
      component.signupForm.setValue({ username: 'NewUser', email: 'new@example.com', password: 'password123', confirmPassword: 'password456' });
      component.onSignupSubmit();
      expect(component.errorMessage).toBe('Passwords do not match.');
      expect(authService.signup).not.toHaveBeenCalled();
    });
  });

  it('should toggle between login and signup mode', () => {
    expect(component.isLoginMode).toBeTrue();
    component.toggleMode();
    expect(component.isLoginMode).toBeFalse();
    component.toggleMode();
    expect(component.isLoginMode).toBeTrue();
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core'; // For mocking ProfileDropdown

// Mock ProfileDropdownComponent
@Component({
  selector: 'app-profile-dropdown',
  template: ''
})
class MockProfileDropdownComponent {
  @Output() closeDropdown = new EventEmitter<void>();
}

// Mock AuthService for HeaderComponent tests
class MockAuthServiceHeader {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<User | null>(null); // Add if needed by template/logic
  logout = jasmine.createSpy('logout');

  // Helper to simulate login/logout for tests
  setLoggedIn(status: boolean, user: User | null = null) {
    this.isLoggedIn$.next(status);
    this.currentUser$.next(user);
  }
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: MockAuthServiceHeader;
  let router: Router;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, MockProfileDropdownComponent ], // Declare mock
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [
        { provide: AuthService, useClass: MockAuthServiceHeader }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthServiceHeader;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Login button when not logged in', () => {
    authService.setLoggedIn(false);
    fixture.detectChanges();
    expect(compiled.querySelector('.btn-login')).toBeTruthy();
    expect(compiled.querySelector('.btn-profile')).toBeFalsy();
  });

  it('should display Profile button when logged in', () => {
    authService.setLoggedIn(true, { id: 1, username: 'Test', email: 'test@example.com' });
    fixture.detectChanges();
    expect(compiled.querySelector('.btn-profile')).toBeTruthy();
    expect(compiled.querySelector('.btn-login')).toBeFalsy();
  });

  it('should navigate to /auth when Login button is clicked', () => {
    authService.setLoggedIn(false);
    fixture.detectChanges();
    const loginButton = compiled.querySelector('.btn-login') as HTMLButtonElement;
    loginButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should toggle profile dropdown when Profile button is clicked', fakeAsync(() => {
    authService.setLoggedIn(true, { id: 1, username: 'Test', email: 'test@example.com' });
    fixture.detectChanges();

    const profileButton = compiled.querySelector('.btn-profile') as HTMLButtonElement;
    expect(profileButton).toBeTruthy();

    expect(component.showProfileDropdown).toBeFalse();
    profileButton.click();
    tick(); // allow for change detection and event propagation
    fixture.detectChanges();
    expect(component.showProfileDropdown).toBeTrue();
    expect(compiled.querySelector('app-profile-dropdown')).toBeTruthy();

    profileButton.click();
    tick();
    fixture.detectChanges();
    expect(component.showProfileDropdown).toBeFalse();
    expect(compiled.querySelector('app-profile-dropdown')).toBeFalsy();
  }));

  // Previous tests for logo and nav links should still pass
  it('should render the logo image', () => {
    expect(compiled.querySelector('.logo img.logo-image')).toBeTruthy();
  });

  it('should render navigation links', () => {
    const navLinks = compiled.querySelectorAll('nav ul li a');
    expect(navLinks.length).toBeGreaterThanOrEqual(4);
  });
});

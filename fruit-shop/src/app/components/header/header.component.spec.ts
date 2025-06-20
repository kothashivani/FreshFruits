import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For routerLink directives
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ RouterTestingModule ] // Import RouterTestingModule for routerLink
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo text "FreshFruits"', () => {
    expect(compiled.querySelector('.logo a')?.textContent).toContain('FreshFruits');
  });

  it('should render navigation links', () => {
    const navLinks = compiled.querySelectorAll('nav ul li a');
    expect(navLinks.length).toBeGreaterThanOrEqual(4); // Home, Products, About, Contact
    expect(navLinks[0]?.textContent).toContain('Home');
    expect(navLinks[1]?.textContent).toContain('Products');
  });

  it('should have a cart icon', () => {
    expect(compiled.querySelector('.cart-icon')?.textContent).toContain('🛒');
  });
});

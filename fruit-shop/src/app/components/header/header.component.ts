import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core'; // Added ElementRef, HostListener
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service'; // Added for cart count
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  // currentUser: User | null = null; // Not strictly needed here if dropdown handles user details
  private authSubscription!: Subscription;
  cartItemCount = 0; // Added for cart badge
  private cartSubscription!: Subscription; // Added for cart count
  showProfileDropdown = false;

  constructor(
    public authService: AuthService, // Keep public for async pipe in template
    private router: Router,
    private elementRef: ElementRef, // For detecting clicks outside dropdown
    private cartService: CartService // Added for cart count
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (!status) { // If user logs out, ensure dropdown is closed
        this.showProfileDropdown = false;
      }
    });

    // Subscribe to cart item count
    this.cartSubscription = this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  closeProfileDropdown(): void { // Method to be called by dropdown component's event
    this.showProfileDropdown = false;
  }

  // HostListener to detect clicks outside the dropdown to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showProfileDropdown) {
      const profileButton = this.elementRef.nativeElement.querySelector('.btn-profile');
      const dropdownElement = this.elementRef.nativeElement.querySelector('app-profile-dropdown');

      // Check if the click was outside the profile button AND outside the dropdown
      if (profileButton && !profileButton.contains(event.target as Node) &&
          dropdownElement && !dropdownElement.contains(event.target as Node)) {
        this.showProfileDropdown = false;
      }
    }
  }
}

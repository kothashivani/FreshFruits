import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust path
import { User } from '../../models/user.model'; // Adjust path
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  currentUser: User | null = null;
  @Output() closeDropdown = new EventEmitter<void>(); // To notify parent (Header) to close

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  navigateToMyOrders(): void {
    this.router.navigate(['/my-orders']); // We'll create this route/page later
    this.closeDropdown.emit();
  }

  logout(): void {
    this.authService.logout();
    this.closeDropdown.emit();
    // AuthService already navigates to home on logout
  }
}

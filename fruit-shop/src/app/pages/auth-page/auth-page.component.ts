import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  loginForm!: FormGroup; // Definite assignment assertion
  signupForm!: FormGroup; // Definite assignment assertion
  isLoginMode = true; // To toggle between Login and Signup
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get lf() { return this.loginForm.controls; } // Login form controls
  get sf() { return this.signupForm.controls; } // Signup form controls

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
    this.successMessage = null;
    this.loginForm.reset();
    this.signupForm.reset();
  }

  onLoginSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.loginForm.invalid) {
      // Mark all fields as touched to display errors
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.successMessage = 'Login successful! Redirecting...';
        // console.log('Logged in user:', user);
        setTimeout(() => this.router.navigate(['/']), 1000); // Redirect to home
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed. Please check your credentials.';
        // console.error('Login error:', err);
      }
    });
  }

  onSignupSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.signupForm.invalid) {
      // Mark all fields as touched to display errors
      this.signupForm.markAllAsTouched();
      if (this.signupForm.errors?.mismatch && (this.sf.confirmPassword.touched || this.sf.password.touched)) {
        // Prioritize mismatch error if relevant fields were touched or form submitted
        this.errorMessage = 'Passwords do not match.';
      }
      return;
    }
    const { confirmPassword, ...signupData } = this.signupForm.value;
    this.authService.signup(signupData).subscribe({
      next: (user) => {
        this.successMessage = 'Signup successful! You are now logged in. Redirecting...';
        // console.log('Signed up user:', user);
        setTimeout(() => this.router.navigate(['/']), 1000); // Redirect to home
      },
      error: (err) => {
        this.errorMessage = err.message || 'Signup failed. Please try again.';
        // console.error('Signup error:', err);
      }
    });
  }
}

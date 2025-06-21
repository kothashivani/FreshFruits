import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormsModule and Validators

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss']
})
export class NewsletterSubscriptionComponent implements OnInit {
  newsletterForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.newsletterForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.newsletterForm.invalid) {
      return;
    }

    // Process subscription (e.g., send to a backend service)
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newsletterForm.value, null, 4));
    // In a real app, you would integrate with a service here.
    // For now, we just log it and reset.
    console.log('Newsletter subscription for:', this.newsletterForm.value.email);
    this.newsletterForm.reset();
    this.submitted = false;
  }
}

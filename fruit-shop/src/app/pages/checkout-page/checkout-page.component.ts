import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  private cartSubscription!: Subscription;

  billingForm!: FormGroup;
  billingFormSubmitted = false;

  shippingForm!: FormGroup;
  shippingFormSubmitted = false;
  shippingSameAsBilling = true;

  selectedPaymentMethod: string = 'creditCard';

  shippingCost = 5.00; // Example: Fixed shipping or calculated later
  taxRate = 0.08; // Example: 8% tax rate
  calculatedTax = 0;
  grandTotal = 0;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.initBillingForm();
    this.initShippingForm();
    this.onShippingSameAsBillingChange();

    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals(); // Recalculate when cartItems change (e.g. item removed)
    });
    this.cartSubscription.add(
      this.cartService.cartTotal$.subscribe(total => {
        this.cartTotal = total;
        this.calculateTotals(); // Recalculate when cartTotal changes
      })
    );
  }

  private initBillingForm(): void {
    this.billingForm = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    });
  }

  get bf() { return this.billingForm.controls; }

  onBillingSubmit(): void {
    this.billingFormSubmitted = true;
    if (this.billingForm.invalid) {
      console.log('Billing form is invalid');
      return;
    }
    console.log('Billing Address:', this.billingForm.value);
    alert('Billing address submitted (mock): ' + JSON.stringify(this.billingForm.value));
  }

  private initShippingForm(): void {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    });
  }

  get sf() { return this.shippingForm.controls; }

  onShippingSameAsBillingChange(checked: boolean): void { // Parameter added
    this.shippingSameAsBilling = checked; // Explicitly set property from event
    if (this.shippingSameAsBilling) {
      this.shippingForm.disable();
      this.shippingForm.reset();
      this.shippingFormSubmitted = false;
    } else {
      this.shippingForm.enable();
    }
  }

  onShippingSubmit(): void {
    this.shippingFormSubmitted = true;
    if (this.shippingForm.invalid && !this.shippingSameAsBilling) {
      console.log('Shipping form is invalid');
      return;
    }
    if (this.shippingSameAsBilling) {
      console.log('Shipping Address is same as Billing Address:', this.billingForm.value);
      alert('Shipping address (same as billing) submitted (mock): ' + JSON.stringify(this.billingForm.value));
    } else {
      console.log('Shipping Address:', this.shippingForm.value);
      alert('Shipping address submitted (mock): ' + JSON.stringify(this.shippingForm.value));
    }
  }

  private calculateTotals(): void {
    this.calculatedTax = this.cartTotal * this.taxRate;
    this.grandTotal = this.cartTotal + this.shippingCost + this.calculatedTax;
    // Add coupon logic here if implemented
  }

  applyCoupon(): void {
    // Placeholder for coupon logic
    alert('Coupon functionality not yet implemented.');
    this.calculateTotals(); // Recalculate totals if coupon affects them
  }

  isCheckoutFormValid(): boolean {
    let billingValid = this.billingForm.valid;
    let shippingValid = this.shippingSameAsBilling || this.shippingForm.valid;
    // Add payment form validation here when implemented
    // For now, just billing and shipping
    return billingValid && shippingValid;
  }

  placeOrder(): void {
    this.billingFormSubmitted = true;
    if (!this.shippingSameAsBilling) {
      this.shippingFormSubmitted = true;
    }

    if (!this.isCheckoutFormValid()) {
      alert('Please ensure all required address fields are correctly filled out.');
      console.error('Checkout forms are invalid');
      // Optionally, scroll to first invalid field across forms
      return;
    }

    const orderDetails = {
      billingAddress: this.billingForm.value,
      shippingAddress: this.shippingSameAsBilling ? this.billingForm.value : this.shippingForm.value,
      paymentMethod: this.selectedPaymentMethod,
      // Add payment details here when implemented
      cartItems: this.cartService.getCartItems(), // Get a snapshot
      subtotal: this.cartTotal,
      shipping: this.shippingCost,
      tax: this.calculatedTax,
      grandTotal: this.grandTotal,
      // couponCode: ... // if implemented
    };

    console.log('Order Placed (Mock):', orderDetails);
    alert('Order placed successfully (mock)!\nDetails: ' + JSON.stringify(orderDetails, null, 2));

    // Next steps: clear cart, navigate to order confirmation page
    this.cartService.clearCart();
    this.router.navigate(['/']); // Navigate to home for now
    // this.router.navigate(['/order-confirmation', someOrderId]); // Example navigation
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.product.id, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  getProductImageUrl(item: CartItem): string {
    return item.product.imageUrl || 'assets/images/default-product.png';
  }
}

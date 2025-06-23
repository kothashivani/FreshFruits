import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Added for toast animations
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Added FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { NewsletterSubscriptionComponent } from './components/newsletter-subscription/newsletter-subscription.component';
import { ProductsPlaceholderComponent } from './pages/products-placeholder/products-placeholder.component';
import { AboutPlaceholderComponent } from './pages/about-placeholder/about-placeholder.component';
import { ContactPlaceholderComponent } from './pages/contact-placeholder/contact-placeholder.component';
// import { CartPlaceholderComponent } from './pages/cart-placeholder/cart-placeholder.component'; // Removed
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductCardComponent,
    TestimonialsComponent,
    NewsletterSubscriptionComponent,
    ProductsPlaceholderComponent,
    AboutPlaceholderComponent,
    ContactPlaceholderComponent,
    // CartPlaceholderComponent, // Removed
    AuthPageComponent,
    ProfileDropdownComponent,
    MyOrdersComponent,
    CheckoutPageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Added for toast animations
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule // Added for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CartPlaceholderComponent } from './pages/cart-placeholder/cart-placeholder.component';


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
    CartPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

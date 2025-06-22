import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPlaceholderComponent } from './pages/products-placeholder/products-placeholder.component';
import { AboutPlaceholderComponent } from './pages/about-placeholder/about-placeholder.component';
import { ContactPlaceholderComponent } from './pages/contact-placeholder/contact-placeholder.component';
// import { CartPlaceholderComponent } from './pages/cart-placeholder/cart-placeholder.component'; // Removed
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsPlaceholderComponent },
  { path: 'about', component: AboutPlaceholderComponent },
  { path: 'contact', component: ContactPlaceholderComponent },
  // { path: 'cart', component: CartPlaceholderComponent }, // Removed
  { path: 'auth', component: AuthPageComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  // Add other routes here if any
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

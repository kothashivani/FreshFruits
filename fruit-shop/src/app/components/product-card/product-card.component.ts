import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service'; // Added for toasts

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  buttonText = 'Add to Cart';

  constructor(private cartService: CartService, private notificationService: NotificationService) { } // Injected NotificationService

  ngOnInit(): void {
    if (!this.product) {
      this.product = {
        id: 'temp', name: 'Error', price: 0, imageUrl: '', description: 'Product data missing.'
      };
      console.error('ProductCardComponent: Product input is missing!');
    }
  }

  getStarRating(rating: number | undefined): string[] {
    if (rating === undefined) return [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return Array(fullStars).fill('full') .concat(Array(halfStar).fill('half')) .concat(Array(emptyStars).fill('empty'));
    // For half star, you might need a different icon or clip-path CSS
  }

  toggleWishlist(product: Product): void {
    product.isWishlisted = !product.isWishlisted;
    console.log('Product ' + product.name + ' wishlisted: ' + product.isWishlisted);
    // In a real app, call a service to update backend/localStorage
  }

  addToCart(): void {
    if (this.product && this.product.id !== 'temp') {
      this.cartService.addItem(this.product);
      this.notificationService.success(`'${this.product.name}' added to cart!`);
      console.log(`Added ${this.product.name} to cart.`);
      this.buttonText = 'Added!';
      setTimeout(() => {
        this.buttonText = 'Add to Cart';
      }, 1500);
    } else {
      console.error('Cannot add invalid product to cart.');
    }
  }
}

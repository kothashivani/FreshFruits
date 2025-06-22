import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  public cartItemCount$: Observable<number>;
  public cartTotal$: Observable<number>;

  private readonly CART_STORAGE_KEY = 'freshFruitsCart';

  constructor() {
    this.loadCartFromLocalStorage();

    this.cartItemCount$ = this.cartItems$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );

    this.cartTotal$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.totalPrice, 0))
    );
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      // Ensure totalPrice is recalculated in case prices changed or data was manually altered
      items.forEach(item => item.totalPrice = item.product.price * item.quantity);
      this.cartItemsSubject.next(items);
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItemsSubject.value));
  }

  addItem(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Product already in cart, update quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].product.price * updatedItems[existingItemIndex].quantity;
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Product not in cart, add new item
      const newItem: CartItem = {
        product: product,
        quantity: quantity,
        totalPrice: product.price * quantity
      };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }
    this.saveCartToLocalStorage();
    // console.log('Cart after add:', this.cartItemsSubject.value);
  }

  removeItem(productId: any): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage();
  }

  updateItemQuantity(productId: any, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const updatedItems = this.cartItemsSubject.value.map(item => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: quantity,
          totalPrice: item.product.price * quantity
        };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage();
  }

  getCartItems(): CartItem[] { // Synchronous getter if needed, but prefer observable
    return this.cartItemsSubject.value;
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage();
  }

  // Observables for direct subscription
  getCartItemCount(): Observable<number> {
    return this.cartItemCount$;
  }

  getCartTotalAmount(): Observable<number> {
    return this.cartTotal$;
  }
}

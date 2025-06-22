import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number; // Calculated: product.price * quantity
}

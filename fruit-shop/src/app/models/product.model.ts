export interface Product {
  id: any;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category?: string;
  badge?: string; // e.g., 'New', 'Sale', 'Organic'
  rating?: number; // e.g., 4.5 (out of 5)
  reviewsCount?: number; // e.g., 120
  isWishlisted?: boolean; // For heart icon state
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('productGrid', { static: false }) productGridElement: ElementRef | undefined;

  products: Product[] = [ // This is the full list, will be copied to allProducts
    { id: 'prod1', name: 'Apple', price: 1.00, imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Fresh and juicy apples.', category: 'common', badge: 'New', rating: 4.5, reviewsCount: 150, isWishlisted: false },
    { id: 'prod2', name: 'Banana', price: 0.50, imageUrl: 'https://images.pexels.com/photos/2280926/pexels-photo-2280926.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Ripe and delicious bananas.', category: 'tropical', rating: 4.0, reviewsCount: 95, isWishlisted: true },
    { id: 'prod3', name: 'Orange', price: 0.75, imageUrl: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Sweet and tangy oranges.', category: 'citrus', badge: 'Sale', rating: 4.2, reviewsCount: 120 },
    { id: 'prod4', name: 'Grapes', price: 2.50, imageUrl: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Sweet and crisp grapes.', category: 'berries', rating: 4.8, reviewsCount: 200, isWishlisted: true },
    { id: 'prod5', name: 'Strawberry', price: 3.00, imageUrl: 'https://images.pexels.com/photos/1364746/pexels-photo-1364746.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Juicy red strawberries.', category: 'berries', badge: 'Organic', rating: 4.9, reviewsCount: 180 },
    { id: 'prod6', name: 'Mango', price: 1.75, imageUrl: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Sweet and exotic mangoes.', category: 'tropical', rating: 4.6, reviewsCount: 110 },
    { id: 'prod7', name: 'Pineapple', price: 2.20, imageUrl: 'https://images.pexels.com/photos/137119/pexels-photo-137119.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Tangy and tropical pineapples.', category: 'tropical', badge: 'Popular', rating: 4.3, reviewsCount: 75 }
  ];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.allProducts = [...this.products]; // Initialize with all products from the hardcoded list
    this.filteredProducts = [...this.allProducts];
    this.extractCategories();
    this.filterByCategory('All'); // Select 'All' by default
  }

  private extractCategories(): void {
    const categorySet = new Set<string>();
    this.allProducts.forEach(p => {
      if (p.category) {
        categorySet.add(p.category);
      }
    });
    this.categories = ['All', ...Array.from(categorySet).sort()];
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = category;
    if (category === null || category === 'All') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(p => p.category === category);
    }
  }

  scrollToProducts(): void {
    this.productGridElement?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

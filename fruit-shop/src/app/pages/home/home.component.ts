import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; // Added ViewChild, ElementRef

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('productGrid', { static: false }) productGridElement: ElementRef | undefined;

  products: any[] = [
    { name: 'Apple', price: '$1.00', imageUrl: 'assets/images/apple.jpg', description: 'Fresh and juicy apples.' },
    { name: 'Banana', price: '$0.50', imageUrl: 'assets/images/banana.jpg', description: 'Ripe and delicious bananas.' },
    { name: 'Orange', price: '$0.75', imageUrl: 'assets/images/orange.jpg', description: 'Sweet and tangy oranges.' },
    { name: 'Grapes', price: '$2.50', imageUrl: 'assets/images/grapes.jpg', description: 'Sweet and crisp grapes.' },
    { name: 'Strawberry', price: '$3.00', imageUrl: 'assets/images/strawberry.jpg', description: 'Juicy red strawberries.' }
  ]; // Added more products for better grid view

  constructor() { }

  ngOnInit(): void {
  }

  scrollToProducts(): void {
    this.productGridElement?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

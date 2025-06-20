import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [
    { name: 'Apple', price: '$1.00', imageUrl: 'assets/images/apple.jpg', description: 'Fresh and juicy apples.' },
    { name: 'Banana', price: '$0.50', imageUrl: 'assets/images/banana.jpg', description: 'Ripe and delicious bananas.' },
    { name: 'Orange', price: '$0.75', imageUrl: 'assets/images/orange.jpg', description: 'Sweet and tangy oranges.' }
  ]; // Placeholder data

  constructor() { }

  ngOnInit(): void {
  }

}

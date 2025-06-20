import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [
    { name: 'Jane D.', quote: 'The fruits are always fresh and delicious! Highly recommend.', location: 'City, State' },
    { name: 'John B.', quote: 'Excellent quality and great customer service. My go-to for fresh produce.', location: 'Another City, State' },
    { name: 'Alice M.', quote: 'I love the variety and the organic options available. Top-notch!', location: 'Yet Another City, State' }
  ]; // Placeholder data

  constructor() { }

  ngOnInit(): void {
  }
}

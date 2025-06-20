import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let compiled: HTMLElement;

  const mockProduct = {
    name: 'Test Apple',
    price: '$9.99',
    imageUrl: 'assets/images/test_apple.jpg',
    description: 'A delicious test apple.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    // Simulate input property
    component.product = mockProduct;

    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product name', () => {
    expect(compiled.querySelector('h3')?.textContent).toContain(mockProduct.name);
  });

  it('should display the product price', () => {
    expect(compiled.querySelector('.price')?.textContent).toContain(mockProduct.price);
  });

  it('should display the product description', () => {
    expect(compiled.querySelector('.description')?.textContent).toContain(mockProduct.description);
  });

  it('should have an "Add to Cart" button', () => {
    expect(compiled.querySelector('button')?.textContent).toContain('Add to Cart');
  });

  it('should display the product image', () => {
    const imgElement = compiled.querySelector('.product-image') as HTMLImageElement;
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(mockProduct.imageUrl);
    expect(imgElement.alt).toContain(mockProduct.name);
  });
});

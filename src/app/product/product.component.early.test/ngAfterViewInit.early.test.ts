
// Unit tests for: ngAfterViewInit


import { ProductComponent } from '../product.component';


import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ProductComponent.ngAfterViewInit() ngAfterViewInit method', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  describe('Happy Paths', () => {
    it('should update the main image source when a small image is clicked', () => {
      // Arrange: Set up the DOM elements
      const mainImage = document.createElement('img');
      mainImage.id = 'mainImage';
      document.body.appendChild(mainImage);

      const smallImage = document.createElement('img');
      smallImage.className = 'small-image';
      smallImage.src = 'small-image-src';
      document.body.appendChild(smallImage);

      // Act: Call ngAfterViewInit and simulate a click on the small image
      component.ngAfterViewInit();
      smallImage.click();

      // Assert: Check if the main image source is updated
      expect(mainImage.src).toBe(smallImage.src);

      // Clean up
      document.body.removeChild(mainImage);
      document.body.removeChild(smallImage);
    });
  });

  describe('Edge Cases', () => {
    it('should not throw an error if main image is not present', () => {
      // Arrange: Ensure no main image is present
      const smallImage = document.createElement('img');
      smallImage.className = 'small-image';
      document.body.appendChild(smallImage);

      // Act & Assert: Call ngAfterViewInit and simulate a click on the small image
      expect(() => {
        component.ngAfterViewInit();
        smallImage.click();
      }).not.toThrow();

      // Clean up
      document.body.removeChild(smallImage);
    });

    it('should handle the case when there are no small images', () => {
      // Arrange: Ensure no small images are present
      const mainImage = document.createElement('img');
      mainImage.id = 'mainImage';
      document.body.appendChild(mainImage);

      // Act & Assert: Call ngAfterViewInit
      expect(() => {
        component.ngAfterViewInit();
      }).not.toThrow();

      // Assert: Check if the main image source remains unchanged
      expect(mainImage.src).toBe('');

      // Clean up
      document.body.removeChild(mainImage);
    });
  });
});

// End of unit tests for: ngAfterViewInit

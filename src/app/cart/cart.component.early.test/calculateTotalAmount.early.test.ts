
// Unit tests for: calculateTotalAmount


import { LoadingService } from '../../_service/loading.service';
import { UserAuthService } from '../../_service/user-auth.service';
import { CartComponent } from '../cart.component';


// Mock classes
interface MockProduct {
  productId: number;
  productName: string;
  price: number;
}

class MockFormGroup {
  controls: { [key: string]: any } = {};
  get = jest.fn((key: string) => this.controls[key]);
  addControl = jest.fn((key: string, control: any) => {
    this.controls[key] = control;
  });
  valueChanges = { subscribe: jest.fn() };
}

class MockCartService {
  getCartItems = jest.fn();
  deleteCartItem = jest.fn();
}

class MockProductService {
  getAllProducts = jest.fn();
}

class MockMessageService {
  add = jest.fn();
}

class MockFormBuilder {
  group = jest.fn(() => new MockFormGroup());
  control = jest.fn((value: any, validators: any) => ({ value, validators }));
}

class MockCouponService {
  validateCoupon = jest.fn();
}

class MockConfirmationService {
  confirm = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

class MockOrderService {
  createOrder = jest.fn();
}

class MockDatePipe {
  transform = jest.fn();
}

describe('CartComponent.calculateTotalAmount() calculateTotalAmount method', () => {
  let component: CartComponent;
  let mockUserAuthService: UserAuthService;
  let mockCartService: MockCartService;
  let mockProductService: MockProductService;
  let mockMessageService: MockMessageService;
  let mockFormBuilder: MockFormBuilder;
  let mockCouponService: MockCouponService;
  let mockConfirmationService: MockConfirmationService;
  let mockRouter: MockRouter;
  let mockOrderService: MockOrderService;
  let mockDatePipe: MockDatePipe;
  let mockLoadingService: LoadingService;

  beforeEach(() => {
    mockUserAuthService = new UserAuthService();
    mockCartService = new MockCartService() as any;
    mockProductService = new MockProductService() as any;
    mockMessageService = new MockMessageService() as any;
    mockFormBuilder = new MockFormBuilder() as any;
    mockCouponService = new MockCouponService() as any;
    mockConfirmationService = new MockConfirmationService() as any;
    mockRouter = new MockRouter() as any;
    mockOrderService = new MockOrderService() as any;
    mockDatePipe = new MockDatePipe() as any;
    mockLoadingService = new LoadingService();

    component = new CartComponent(
      mockUserAuthService as any,
      mockCartService as any,
      mockProductService as any,
      mockMessageService as any,
      mockFormBuilder as any,
      mockCouponService as any,
      mockConfirmationService as any,
      mockRouter as any,
      mockOrderService as any,
      mockDatePipe as any,
      mockLoadingService as any
    );
  });

  describe('Happy paths', () => {
    it('should calculate total amount correctly for multiple products', () => {
      // Arrange
      const mockProducts: MockProduct[] = [
        { productId: 1, productName: 'Product 1', price: 100 },
        { productId: 2, productName: 'Product 2', price: 200 },
      ];
      const mockCart = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ];
      component.product = mockProducts as any;
      component.cart = mockCart as any;
      component.cartForm = new MockFormGroup() as any;
      component.cartForm.controls = {
        '1': { value: 2 },
        '2': { value: 1 },
      };

      // Act
      component.calculateTotalAmount();

      // Assert
      expect(component.totalAmount).toBe(400);
      expect(component.totalAmountWithDiscount).toBe(400);
    });

    it('should apply discount correctly', () => {
      // Arrange
      const mockProducts: MockProduct[] = [
        { productId: 1, productName: 'Product 1', price: 100 },
      ];
      const mockCart = [{ productId: 1, quantity: 2 }];
      component.product = mockProducts as any;
      component.cart = mockCart as any;
      component.cartForm = new MockFormGroup() as any;
      component.cartForm.controls = {
        '1': { value: 2 },
      };
      component.discountAmount = 50;

      // Act
      component.calculateTotalAmount();

      // Assert
      expect(component.totalAmount).toBe(200);
      expect(component.totalAmountWithDiscount).toBe(150);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty cart gracefully', () => {
      // Arrange
      component.product = [] as any;
      component.cart = [] as any;
      component.cartForm = new MockFormGroup() as any;

      // Act
      component.calculateTotalAmount();

      // Assert
      expect(component.totalAmount).toBe(0);
      expect(component.totalAmountWithDiscount).toBe(0);
    });

    it('should handle product not found in cart', () => {
      // Arrange
      const mockProducts: MockProduct[] = [
        { productId: 1, productName: 'Product 1', price: 100 },
      ];
      const mockCart = [{ productId: 2, quantity: 1 }];
      component.product = mockProducts as any;
      component.cart = mockCart as any;
      component.cartForm = new MockFormGroup() as any;
      component.cartForm.controls = {
        '2': { value: 1 },
      };

      // Act
      component.calculateTotalAmount();

      // Assert
      expect(component.totalAmount).toBe(0);
      expect(component.totalAmountWithDiscount).toBe(0);
    });

    it('should handle zero quantity gracefully', () => {
      // Arrange
      const mockProducts: MockProduct[] = [
        { productId: 1, productName: 'Product 1', price: 100 },
      ];
      const mockCart = [{ productId: 1, quantity: 0 }];
      component.product = mockProducts as any;
      component.cart = mockCart as any;
      component.cartForm = new MockFormGroup() as any;
      component.cartForm.controls = {
        '1': { value: 0 },
      };

      // Act
      component.calculateTotalAmount();

      // Assert
      expect(component.totalAmount).toBe(0);
      expect(component.totalAmountWithDiscount).toBe(0);
    });
  });
});

// End of unit tests for: calculateTotalAmount

import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { CartService } from '../_service/cart.service';
import { ProductService } from '../_service/product.service';
import { Product } from '../../model/product.model';
import { Cart } from '../../model/cart.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { LoadingComponent } from '../shared/loader/loader.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CouponService } from '../_service/coupon.service';
import { HeaderComponent } from '../header/header.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { OrderService } from '../_service/order.service';
import { Orders } from '../../model/orders.model';
import { LoadingService } from '../_service/loading.service';

@Component({
  selector: 'app-cart',
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    Toast,
    NgFor,
    NgIf,
    HeaderComponent,
    ConfirmDialogModule,
    DatePipe
  ],
  standalone: true,
  providers: [
    MessageService,
    ConfirmationService,
    DatePipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  product: Product[] = [];
  cart: Cart[] = [];
  cartForm!: FormGroup;
  couponCode: string = '';  // Store the coupon code entered by the user
  errorMessage: string = '';
  totalAmount!: number;
  totalAmountWithDiscount!: number; // Store the total amount after applying the discount
  discountType: string = '';
  discountAmount: number = 0;
  appliedCoupons: string[] = [];

  couponForm!: FormGroup;

  constructor(
    private userAuthService: UserAuthService,
    private cartService: CartService,
    private productService: ProductService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private couponService: CouponService,
    private confirmationService: ConfirmationService,
    private readonly router: Router,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
  ) { }

  initialiseForm() {
    this.couponForm = this.fb.group({
      code: ['']
    })
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.initialiseForm();
    if (!this.userAuthService.isLoggedIn()) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please login to see cart',
        });
      }, 0);
    } else {
      this.getCartDetails();
    }


  }
  getCartDetails() {
    const userId = this.userAuthService.getUserId();
    this.cartService.getCartItems(userId).subscribe((cartItems: Cart[]) => {
      this.cart = cartItems;
      this.loadingService.hide();
      this.productService.getAllProducts().subscribe(
        (products: Product[]) => {
          this.product = products.filter(product => cartItems.some(item => item.productId === product.productId)
          );

          // Initialize cartForm after the data is available
          this.cartForm = this.fb.group({});
          cartItems.forEach(item => {
            this.cartForm.addControl(item.productId.toString(), this.fb.control(item.quantity, Validators.min(1)));
          });

          this.calculateTotalAmount();

          this.cartForm.valueChanges.subscribe(values => {
            this.errorMessage = ''; // Clear any error when the value changes
            this.calculateTotalAmount(); // Recalculate the total whenever a value changes
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error fetching products',
            detail: 'Could not fetch product details',
          });
        }
      );
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error fetching cart items',
        detail: 'Could not fetch cart items',
      });
    });
  }

  getProductName(productId: number): string {
    const product = this.product.find(p => p.productId === productId);
    return product ? product.productName : 'Product Not Found';
  }

  getProductPrice(productId: number): string {
    const product = this.product.find(p => p.productId === productId);
    return product ? `Rs: ${product.price}` : 'N/A';
  }

  getSubTotal(productId: number, quantity: number): string {
    const product = this.product.find(p => p.productId === productId);
    return product ? `Rs: ${(product.price * quantity).toFixed(2)}` : '0';
  } 

  // Method to calculate the total of all subtotals
  calculateTotalAmount(): void {
    this.totalAmount = 0;
    this.cart.forEach(item => {
      const quantity = this.cartForm.get(item.productId.toString())?.value || 1;
      const product = this.product.find(p => p.productId === item.productId);
      if (product) {
        this.totalAmount += product.price * quantity;
      }
    });

    // Apply discount if available
    this.totalAmountWithDiscount = this.totalAmount - this.discountAmount;

    // Round the total amounts to two decimal places
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    this.totalAmountWithDiscount = parseFloat(this.totalAmountWithDiscount.toFixed(2));
  }


  onQuantityChange(productId: number, event: any) {
    const quantity = event.target.value;
    if (quantity <= 0) {
      this.errorMessage = 'Quantity cannot be zero or negative.';
      this.cartForm.get(productId.toString()); // reset to 1 if the quantity is invalid
    } else {
      this.errorMessage = ''; // clear the error message if the quantity is valid
    }
  }

  applyCoupon(): void {
    this.loadingService.show();
    if (!this.cart || this.cart.length === 0) {
      this.errorMessage = "There are no products in your cart.";
      this.loadingService.hide();
      return;
    }
  
    const couponCode = this.couponForm.get('code')?.value?.trim();
  
    if (!couponCode) {
      this.errorMessage = "Please enter a coupon code.";
      this.loadingService.hide();
      return;
    }
  
    if (this.appliedCoupons.includes(couponCode)) {
      this.errorMessage = "This coupon has already been applied.";
      this.loadingService.hide();
      return;
    }
  
    this.couponService.validateCoupon(couponCode).subscribe(
      coupon => {
        this.loadingService.hide();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Coupon Applied Successfully' });
  
        this.appliedCoupons.push(couponCode); // Store applied coupon
        this.errorMessage = '';
  
        if (coupon.discountType === 'PERCENTAGE') {
          this.discountAmount += (this.totalAmount * coupon.discountAmount) / 100;
        } else if (coupon.discountType === 'AMOUNT') {
          this.discountAmount += coupon.discountAmount;
        }
  
        this.discountType = coupon.discountType;
        this.calculateTotalAmount();
        this.couponForm.reset();
      },
      error => {
        this.loadingService.hide();
        this.errorMessage = error.error.title || "Invalid coupon code.";
      }
    );
  }
  
  removeCoupon(couponCode: string): void {
    this.couponService.validateCoupon(couponCode).subscribe(
      coupon => {
        this.appliedCoupons = this.appliedCoupons.filter(coupon => coupon !== couponCode);
  
        if (coupon.discountType === 'PERCENTAGE') {
          this.discountAmount -= (this.totalAmount * coupon.discountAmount) / 100;
        } else if (coupon.discountType === 'AMOUNT') {
          this.discountAmount -= coupon.discountAmount;
        }
  
        if (this.discountAmount < 0) {
          this.discountAmount = 0;
        }
  
        this.calculateTotalAmount();
        
        this.messageService.add({ severity: 'info', summary: 'Coupon Removed', detail: `${couponCode} removed successfully` });
      },
      error => {
        this.errorMessage = "Error removing coupon.";
      }
    );
  }
  removeItem(event: Event, cart: Cart) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to remove this product?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Remove',
        severity: 'danger',
      },
      accept: () => {
        this.loadingService.show();
        console.log(cart);
        this.cartService.deleteCartItem(cart.cartId).subscribe((response) => {
          this.loadingService.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item removed from cart' });
          this.getCartDetails();
        })

      },
      reject: () => {
      },
    });
  }

  getProductImageUrl(productId: number): string {
    const product = this.product.find(p => p.productId === productId);
    return product?.imageUrl ?? 'assets/default-placeholder.png'; 
  }

  proceedToCheckOut() {
    if (!this.cart || this.cart.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Your cart is empty!',
      });
      return;
    }
  
    const currentDate = new Date();
    
    const orderItems = this.cart.map(item => {
      const updatedQuantity = this.cartForm.get(item.productId.toString())?.value || 0;
      return {
        productId: item.productId,
        variantId: item.variantId,
        quantity: updatedQuantity,
        priceAtTimeOfOrder: this.product.find(p => p.productId === item.productId)?.price || 0,
      };
    });
  
    const order: Orders = {
      userId: this.userAuthService.getUserId(),
      orderDate: currentDate.toISOString().split('T')[0], 
      status: 'CREATED',
      totalPrice: this.totalAmountWithDiscount,
      paymentStatus: 'PENDING',
      shippingAddress: '123 Main Street, City, Country',
      createdAt: currentDate.toISOString(),
      orderItems: orderItems,
    };
  
    localStorage.setItem('pendingOrder', JSON.stringify(order));
    console.log( localStorage.getItem('pendingOrder'));
    this.router.navigate(['/checkout']);
  
    // this.orderService.createOrder(order).subscribe(
    //   (response) => {
    //     console.log('Order created successfully:', response);
        
    //     localStorage.setItem('pendingOrder', JSON.stringify(response));
  
    //     this.router.navigate(['/checkout']);
    //   },
    //   (error) => {
    //     console.error('Error creating order:', error);
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Order Failed',
    //       detail: 'Failed to create order. Please try again!',
    //     });
    //   }
    // );
  }
  

}

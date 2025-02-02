import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { HeaderComponent } from '../header/header.component';
import { UserAuthService } from '../_service/user-auth.service';
import { WishlistService } from '../_service/wishlist.service';
import { Wishlist } from '../../model/wishlist.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Cart } from '../../model/cart.model';
import { CartService } from '../_service/cart.service';
import { CouponService } from '../_service/coupon.service';
import { ProductService } from '../_service/product.service';
import { LoadingComponent } from '../shared/loader/loader.component';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-wishlist',
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    LoadingComponent,
    Toast,
    ConfirmDialog,
    NgFor,
    NgIf,
    FooterComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  standalone: true,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  userId!: string;
  wishlist: Wishlist[] = [];
  product: Product[] = [];
  cart: Cart[] = [];
  cartForm!: FormGroup;
  couponCode: string = '';  // Store the coupon code entered by the user
  errorMessage: string = '';
  totalAmount!: number;
  totalAmountWithDiscount!: number; // Store the total amount after applying the discount
  discountType: string = '';
  discountAmount: number = 0;

  constructor(
    private userAuthService: UserAuthService,
    private wishListService: WishlistService,
    private cartService: CartService,
    private productService: ProductService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private couponService: CouponService,
    private confirmationService: ConfirmationService,
    private readonly router: Router,
  ) { }
  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
    this.getWishlistDetails(this.userId);
  }
  getWishlistDetails(userId: string) {
    this.wishListService.getWishlist(this.userId).subscribe((wishlist) => {
      this.wishlist = wishlist;
      this.productService.getAllProducts().subscribe(
        (products: Product[]) => {
          this.product = products.filter(product => wishlist.some(item => item.productId === product.productId)
          );

          // Initialize cartForm after the data is available
          this.cartForm = this.fb.group({});


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
    })
  }

  addToCart(wishlist: Wishlist) {
    if (this.userAuthService.isLoggedIn()) {
      const userId: string = this.userAuthService.getUserId();
      const cart = new Cart();
      cart.productId = wishlist.productId;
      cart.userId = userId;
      cart.quantity = 1;
      cart.createdAt = new Date().toISOString();
      cart.variantId = 1001;
      console.log(cart);

      this.cartService.addToCart(cart).subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added to cart.' });
        this.router.navigate(['/cart']);
      }, (error) => {
        if (error.error.type == 'R001') {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to cart' });
    }
  }

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
    return product ? `Rs: ${product.price * quantity}` : '0';
  }
  onQuantityChange(productId: number, event: any) {
    const quantity = event.target.value;
    if (quantity <= 0) {
      this.errorMessage = 'Quantity cannot be zero or negative.';
      this.cartForm.get(productId.toString())?.setValue(1); // reset to 1 if the quantity is invalid
    } else {
      this.errorMessage = ''; // clear the error message if the quantity is valid
    }
  }
  removeItem(event: Event, wishlist: Wishlist) {
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
        console.log(wishlist);
        this.wishListService.removeFromWishlist(wishlist.wishlistId).subscribe((response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item removed from wishlist' });
          this.getWishlistDetails(this.userId)
        })

      },
      reject: () => {
      },
    });
  }
}

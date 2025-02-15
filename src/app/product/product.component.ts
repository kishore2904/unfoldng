import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { Product } from '../../model/product.model';
import { UserAuthService } from '../_service/user-auth.service';
import { LoadingService } from '../_service/loading.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from '../shared/loader/loader.component';
import { HeaderComponent } from '../header/header.component';
import { Category } from '../../model/category.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Wishlist } from '../../model/wishlist.model';
import { WishlistStatus } from '../../model/wishlistStatus.model';
import { Cart } from '../../model/cart.model';
import { CartService } from '../_service/cart.service';
import { WishlistService } from '../_service/wishlist.service';
import { Orders } from '../../model/orders.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [
    FooterComponent,
    RouterModule,
    LoadingComponent,
    Toast,
    HeaderComponent,
    NgClass,
    NgFor,
  ],
  providers: [MessageService,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit, OnInit {

  productId!: number;
  categoryId!: number;
  product!: Product;
  products: Product[] = [];

  productList: Product[] = [];
  wishlist: Set<number> = new Set(); 
  category: Category[] = [];
  wishlistProduct: Wishlist[] = [];

  totalAmount!: number;
  totalAmountWithDiscount!: number;
  cart: Cart[] = [];
  cartForm!: FormGroup;
  discountType: string = '';
  discountAmount: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private userAuthService: UserAuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) { }
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    if (this.categoryId != null && this.productId != null) {
      this.productService.getProductDetails(this.categoryId, this.productId).subscribe((productDetail) => {
        this.product = productDetail;

      })
    }
    this.productService.getAllProducts().subscribe((response) => {
      this.loadingService.hide();
      this.productList = response.slice(0, 4);
      
    });
    this.wishlistService.getWishlist(this.userAuthService.getUserId()).subscribe((response) => {
      this.wishlistProduct = response.filter(wishlist => wishlist.status === WishlistStatus.ACTIVE);
      console.log('Active Wishlist Products:', this.wishlistProduct); // Log active products for debugging
    });

  }

  ngAfterViewInit(): void {
    const mainImage = <HTMLImageElement>document.getElementById('mainImage');
    const smallImages = Array.from(document.getElementsByClassName('small-image')) as HTMLImageElement[];

    smallImages.forEach((smallImage) => {
      smallImage.addEventListener('click', () => {
        if (mainImage) {
          mainImage.src = smallImage.src;
        }
      });
    });
  }
  buyNow(product: Product) {
    const currentDate = new Date();
  
    const orderItem = {
      productId: product.productId,
      variantId: 1 || null,
      quantity: 1, // Default quantity is 1 for direct buy
      priceAtTimeOfOrder: product.price || 0,
    };
  
    const order: Orders = {
      userId: this.userAuthService.getUserId(),
      orderDate: currentDate.toISOString().split('T')[0], 
      status: 'CREATED',
      totalPrice: product.price || 0,
      paymentStatus: 'PENDING',
      shippingAddress: '123 Main Street, City, Country',
      createdAt: currentDate.toISOString(),
      orderItems: [orderItem],
    };
  
    localStorage.setItem('pendingOrder', JSON.stringify(order));
    console.log('Pending order',localStorage.getItem('pendingOrder'));
    this.router.navigate(['/checkout']);
  }
  

  calculateTotalAmount(): void {
    this.totalAmount = 0;
    this.cart.forEach(item => {
      const quantity = this.cartForm.get(item.productId.toString())?.value || 1;
      const product = this.products.find(p => p.productId === item.productId);
      if (product) {
        this.totalAmount += product.price * quantity;
      }
    });
  
    // **Ensure discount does not exceed total amount**
    this.discountAmount = Math.min(this.discountAmount, this.totalAmount);
    
    this.totalAmountWithDiscount = this.totalAmount - this.discountAmount;
  
    // **Ensure total is not negative and round to 2 decimal places**
    this.totalAmountWithDiscount = Math.max(this.totalAmountWithDiscount, 0);
    this.totalAmountWithDiscount = parseFloat(this.totalAmountWithDiscount.toFixed(2));
  } 
  addToWishlist(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      console.log(product);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to wishlist' });
    }
  }

  getCategoryName(categoryId: number): string | undefined {
    const category = this.category.find((cat) => cat.categoryId === categoryId);
    return category?.categoryName;
  }
  isProductInWishlist(product: Product): boolean {
    return this.wishlistProduct.some(wishlist => wishlist.productId === product.productId && wishlist.status === WishlistStatus.ACTIVE);
  }

  addToCart(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      const userId: string = this.userAuthService.getUserId();
      const cart = new Cart();
      cart.productId = product.productId;
      cart.userId = userId;
      cart.quantity = 1;
      cart.createdAt = new Date().toISOString();
      cart.variantId = 1001;
      console.log(cart);

      this.cartService.addToCart(cart).subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added to cart.' });
      }, (error) => {
        if (error.error.type == 'R001') {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to cart' });
    }
  }
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const totalStars = [...Array(fullStars).fill(1), ...Array(halfStar).fill(0.5)];
    return totalStars;
  }
}
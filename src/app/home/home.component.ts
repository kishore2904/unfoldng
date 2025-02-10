import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { CategoryService } from '../_service/category.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Product } from '../../model/product.model';
import { NgClass, NgFor } from '@angular/common';
import { Category } from '../../model/category.model';
import { LoadingService } from '../_service/loading.service';
import { LoadingComponent } from '../shared/loader/loader.component';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Cart } from '../../model/cart.model';
import { CartService } from '../_service/cart.service';
import { HeaderComponent } from '../header/header.component';
import { WishlistService } from '../_service/wishlist.service';
import { Wishlist } from '../../model/wishlist.model';
import { WishlistStatus } from '../../model/wishlistStatus.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    FooterComponent,
    LoadingComponent,
    NgFor,
    Toast,
    HeaderComponent,
    NgClass
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  product: Product[] = [];
  featuredProduct: Product[] = [];
  category: Category[] = [];
  cart!: Cart;
  wishlist: Set<number> = new Set(); 
  wishlistProduct:Wishlist[]=[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userAuthService: UserAuthService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.categoryService.getCategory().subscribe((response) => {
      this.loadingService.hide();
      this.category = response;
    });

    this.productService.getAllProducts().subscribe((response) => {
      this.loadingService.hide();
      this.product = response.slice(0, 4);
      this.featuredProduct = response.slice(0, 8);;
    });

    this.wishlistService.getWishlist(this.userAuthService.getUserId()).subscribe((response) => {
      this.wishlistProduct = response.filter(wishlist => wishlist.status === WishlistStatus.ACTIVE);
      console.log('Active Wishlist Products:', this.wishlistProduct); // Log active products for debugging
    });
  }

  getCategoryName(categoryId: number): string | undefined {
    const category = this.category.find((cat) => cat.categoryId === categoryId);
    return category?.categoryName;
  }

  navigateToShop(product: Product) {
    this.router.navigate(['/product', product.categoryId, product.productId]);
  }

  toShop() {
    this.router.navigate(['/shop']);
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

  addToWishlist(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      const existingWishlistItem = this.wishlistProduct.find(item => item.productId === product.productId);
  
      if (existingWishlistItem) {
        const wishlistId = existingWishlistItem.wishlistId; 
  
        this.wishlistService.removeFromWishlist(wishlistId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Removed from Wishlist', detail: 'Product removed from wishlist' });
  

          this.wishlistProduct = this.wishlistProduct.filter(item => item.wishlistId !== wishlistId);
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
        });
      } else {
        this.wishlistService.addToWishlist(this.userAuthService.getUserId(), product.productId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Added to Wishlist', detail: 'Product added to wishlist' });
  

          const newWishlistItem: Wishlist = {
            wishlistId: 0,
            productId: product.productId,
            userId: this.userAuthService.getUserId(),
            status: WishlistStatus.ACTIVE,
            dateAdded: new Date().toISOString(),
          };
          this.wishlistProduct.push(newWishlistItem);
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
        });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to wishlist' });
    }
  }

  isProductInWishlist(product: Product): boolean {
    return this.wishlistProduct.some(wishlist => wishlist.productId === product.productId && wishlist.status === WishlistStatus.ACTIVE);
  }
}

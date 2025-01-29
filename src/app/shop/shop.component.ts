import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../_service/category.service';
import { ProductService } from '../_service/product.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Product } from '../../model/product.model';
import { NgFor } from '@angular/common';
import { Category } from '../../model/category.model';
import { LoadingService } from '../_service/loading.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule,
    NgFor,
    LoadingComponent,
    Toast
  ],
  providers: [MessageService,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  product: Product[] = [];
  category: Category[] = [];
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userAuthService: UserAuthService,
    private loadingService: LoadingService,
    private messageService: MessageService,
  ) {

  }
  ngOnInit(): void {
    this.loadingService.show();

    this.categoryService.getCategory().subscribe((response) => {
      this.loadingService.hide();
      this.category = response;
    })
    this.productService.getAllProducts().subscribe((response) => {
      this.product = response;
      console.log(response);

    })

  }

  navigateToProduct() {
    this.router.navigate(['/product'])
  }

  navigateToShop(product: Product) {
    this.router.navigate(['/product', product.categoryId, product.productId]);

  }
  addToCart(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      const userId: string = this.userAuthService.getUserId();
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
  getCategoryName(categoryId: number): string | undefined {
    const category = this.category.find((cat) => cat.categoryId === categoryId);
    return category?.categoryName;
  }
  addToWishlist(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      console.log(product);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to wishlist' });
    }
  }

}

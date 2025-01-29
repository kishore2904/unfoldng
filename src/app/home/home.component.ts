import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { CategoryService } from '../_service/category.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Product } from '../../model/product.model';
import { NgFor } from '@angular/common';
import { Category } from '../../model/category.model';
import { LoadingService } from '../_service/loading.service';
import { LoadingComponent } from '../shared/loader/loader.component';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    Toast
  ],
  providers: [MessageService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  product: Product[] = [];
  featuredProduct: Product[] = [];
  category: Category[] = [];


  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userAuthService: UserAuthService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.categoryService.getCategory().subscribe((response) => {
      this.loadingService.hide();
      this.category = response;
    })

    this.productService.getAllProducts().subscribe((response) => {
      this.loadingService.hide();

      this.product = response.slice(0, 4);
      this.featuredProduct = response;
    });

    // Uncomment if you want to check for authentication
    // if(this.userAuthService.isLoggedIn()){
    //   console.log("logged in");
    // }else{
    //   this.router.navigate(['/login']);
    // }
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
    console.log(product);

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

  addToWishlist(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      console.log(product);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to wishlist' });
    }
  }

}

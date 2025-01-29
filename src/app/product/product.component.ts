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

@Component({
  selector: 'app-product',
  imports: [
    FooterComponent,
    RouterModule,
    LoadingComponent,
    Toast
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

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private userAuthService: UserAuthService,
  ) { }
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    if (this.categoryId != null && this.productId != null) {
      this.productService.getProductDetails(this.categoryId, this.productId).subscribe((productDetail) => {
        this.product = productDetail;

      })
    }

  }

  addToCart() {
    this.router.navigate(['/cart']);
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

  }
  addToWishlist(product: Product) {
    if (this.userAuthService.isLoggedIn()) {
      console.log(product);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Login to add items to wishlist' });
    }
  }
}
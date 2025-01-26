import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product',
  imports: [
    FooterComponent,
    RouterModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit,OnInit {

  productId!:number;
  categoryId!:number;
  product!:Product;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    if(this.categoryId!=null && this.productId!=null){
      this.productService.getProductDetails(this.categoryId,this.productId).subscribe((productDetail)=>{
        this.product = productDetail;
        
      })
    }

  }

  addToCart(){
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
}
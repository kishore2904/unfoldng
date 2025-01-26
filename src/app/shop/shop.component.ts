import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../_service/category.service';
import { ProductService } from '../_service/product.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Product } from '../../model/product.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule,
    NgFor
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  product:Product[]=[];
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userAuthService: UserAuthService,
  ) {

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response)=>{
      this.product = response;
      console.log(response);
      
    })

  }

  navigateToProduct() {
    this.router.navigate(['/product'])
  }

  navigateToShop(product:Product){
    this.router.navigate(['/product',product.categoryId,product.productId]);
    
  }
  addToCart(product:Product){
    console.log("Add product to cart");
    
  }
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const totalStars = [...Array(fullStars).fill(1), ...Array(halfStar).fill(0.5)];
    return totalStars;
  }

}

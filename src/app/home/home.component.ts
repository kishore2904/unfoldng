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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    FooterComponent,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  product:Product[]=[];
  featuredProduct: Product[] =[];
  category: Category[] =[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userAuthService: UserAuthService,
  ){
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response)=>{
      this.product = response.slice(0,4);
      this.featuredProduct = response;  
      console.log(response);
      
    })
  //   if(this.userAuthService.isLoggedIn()){
  //   console.log("logged in");
    
  // }else{
  //   this.router.navigate(['/login']);
  // }
  }

  navigateToShop(product:Product){
    this.router.navigate(['/product',product.categoryId,product.productId]);
    
  }
  toShop(){
    this.router.navigate(['/shop']);
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



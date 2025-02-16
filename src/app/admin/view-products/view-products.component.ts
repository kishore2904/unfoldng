import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { Product } from '../../../model/product.model';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../_service/product.service';

@Component({
  selector: 'app-view-products',
  imports: [
    TableModule,
    AdminHeadersComponent,
    ButtonModule,
    RatingModule
  ],
  standalone:true,
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent implements OnInit{
  products: Product[]=[];

  constructor(
    private productService: ProductService
  ){}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((response)=>{
      this.products = response;
    })
  }

}

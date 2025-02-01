import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-wishlist',
  imports: [HeaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  ngOnInit(): void {
    
  }
  addToCart(){
    console.log('added');
    
  }

}

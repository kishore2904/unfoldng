import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(
    private router: Router,
  ){
  }

  ngOnInit(): void {
    
  }
  navigateToShop(){
    this.router.navigate(['/shop']);
    console.log("Navigate to shop page with the parameters");
    
  }

  addToCart(){
    console.log("Add product to cart");
    
  }

}

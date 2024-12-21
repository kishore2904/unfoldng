import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone:true,
  imports: [
    FooterComponent,
    RouterModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private router: Router,){

  }

  navigateToProduct(){
    this.router.navigate(['/product'])
  }

}

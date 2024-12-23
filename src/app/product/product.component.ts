import { AfterViewInit, Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [
    FooterComponent,
    RouterModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit {

  constructor(private router: Router) { }

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
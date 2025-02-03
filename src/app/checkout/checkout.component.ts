import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [
    HeaderComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  currentSection: number = 1;
  goToNextSection() {
    if (this.currentSection < 4) {
      this.currentSection++;
    }
  }

}

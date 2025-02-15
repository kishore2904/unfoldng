import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/user.model';
import { Orders } from '../../model/orders.model';
import { OrderItems } from '../../model/orderItems.model';
import { ProductService } from '../_service/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-checkout',
  imports: [
    HeaderComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  currentSection: number = 1;
  order!: Orders;
  orderItemsWithNames: any[] = [];

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.userAuthService.getUserId() != null) {
      this.userService.getUserDetails(this.userAuthService.getUserId()).subscribe((response: User) => {
        this.checkoutForm.patchValue({
          firstName: response.firstName || '',
          lastName: response.lastName || '',
          emailAddress: response.emailAddress || '',
          phoneNumber: response.phoneNumber || '',
          address: response.address || '',
          city: response.city || '',
          state: response.state || '',
          zipCode: response.zipCode || ''
        });
      });
    }

    // Retrieve order from local storage
    const storedOrder = localStorage.getItem('pendingOrder');
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
      console.log(this.order);
      
      this.fetchProductDetails();
    }
  }

  initializeForm() {
    this.checkoutForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    });
  }

  fetchProductDetails() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.orderItemsWithNames = this.order.orderItems.map((item: OrderItems) => {
        const product = products.find(p => p.productId === item.productId);
        return {
          ...item,
          productName: product ? product.productName : 'Product Not Found'
        };
      });

      console.log(this.orderItemsWithNames);
    });
  }

  goToNextSection() {
    if (this.currentSection < 4) {
      this.currentSection++;
    }
  }

  submitForm() {
    console.log(this.checkoutForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../_service/category.service';
import { Category } from '../../../../model/category.model';
import { NgFor } from '@angular/common';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../_service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-add-product',
  imports: [
    AdminHeaderComponent,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss'
})
export class AdminAddProductComponent implements OnInit {
  productForm!: FormGroup;
  category: Category[] = [];
  colors: string[] = ['Black', 'Blue', 'Red'];
  size: string[] = ['S','M','L','XL','XXL'];
  product!: Product;

  private subscriptions: Subscription[] =[];

  constructor(
    private fb: FormBuilder, 
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllCategory();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      size: [[], Validators.required],
      color: [[], Validators.required], // Changed to array
      categoryId: [null, Validators.required], // Changed to array
      stockQuantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      productDescription: ['', Validators.required],
      imageUrl: [null]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.product = this.productForm.value;
      this.subscriptions.push(this.productService.createNewProduct(this.product,this.product.categoryId).subscribe((response)=>{
        
      }))
      // You can handle the submitted data here
    } else {
      console.log('Form is not valid');
    }
  }

  onReset(): void {
    this.productForm.reset();
  }

  getAllCategory(): void {
    this.categoryService.getCategory().subscribe((response) => {
      this.category = response;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../_service/category.service';
import { Category } from '../../../../model/category.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-add-product',
  imports: [
    AdminHeaderComponent,
    ReactiveFormsModule,
  NgFor],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss'
})
export class AdminAddProductComponent implements OnInit{
  productForm!: FormGroup;
  category: Category[] =[];
  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.getAllCategory();
  }

  initializeForm():void{
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      productDescription: ['', Validators.required],
      productImage: [null]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form submitted', this.productForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  onReset(): void {
    this.productForm.reset();
  }
  getAllCategory(): void{
    this.categoryService.getCategory().subscribe((response)=>{
      this.category = response;
      console.log(this.category);
      
    })
  }

}

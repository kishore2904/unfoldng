import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-product',
  imports: [AdminHeaderComponent,ReactiveFormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss'
})
export class AdminAddProductComponent implements OnInit{
  productForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initializeForm();
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

}

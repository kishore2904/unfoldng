import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../_service/category.service';
import { ProductService } from '../../../_service/product.service';
import { Category } from '../../../../model/category.model';
import { Product } from '../../../../model/product.model';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { NgFor } from '@angular/common';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';

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
  size: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private categoryService: CategoryService,
    private productService: ProductService,
    private storage: Storage
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
      color: [[], Validators.required],
      categoryId: [null, Validators.required],
      stockQuantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      productDescription: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      console.log("No file selected.");
      return;
    }

    const storageRef = ref(this.storage, `products/${this.selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);

    uploadTask.then(snapshot => {
      getDownloadURL(snapshot.ref).then(downloadURL => {
        console.log("File available at:", downloadURL);

        // Prepare product data including the image URL
        const productData = { 
          ...this.productForm.value, 
          imageUrl: downloadURL 
        };

        console.log("Product Data:", productData);

        // Call your service to save the product data
        this.productService.createNewProduct(productData, 1).subscribe(response => {
          console.log("Product added successfully", response);
          this.productForm.reset();
          this.selectedFile = null; // Reset the file selection
        });
      });
    }).catch(error => {
      console.error("File upload error:", error);
    });
  }

  onReset(): void {
    this.productForm.reset();
    this.selectedFile = null;
  }

  getAllCategory(): void {
    this.categoryService.getCategory().subscribe(response => {
      this.category = response;
    });
  }
}

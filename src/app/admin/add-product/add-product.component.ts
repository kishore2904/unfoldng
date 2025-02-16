import { Component, OnInit } from '@angular/core';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductColorService } from '../../_service/product-color.service';
import { ProductColor } from '../../../model/productColor.model';
import { ProductSizeService } from '../../_service/product-size.service';
import { ProductSize } from '../../../model/productSize.model';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../../model/category.model';
import { Product } from '../../../model/product.model';

interface UploadEvent {
  originalEvent: FileUploadEvent;
  files: File[];
}

@Component({
  selector: 'app-add-product',
  imports: [
    AdminHeadersComponent,
    FormsModule,
    InputTextModule,
    FloatLabel,
    TextareaModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    FileUploadModule,
    FileUpload,
    ToastModule,
    NgFor,
    NgIf,
    TableModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {
  uploadedFiles: any[] = [];
  productColors: ProductColor[] = [];
  productSize: ProductSize[] = [];
  categories: Category[] = [];
  visible: boolean = false;
  product: Product[] = [];

  addProductForm!: FormGroup;
  addProductVariant!: FormGroup;


  products = [
    { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
    { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20 },
    { code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 30 },
  ];
  constructor(
    private messageService: MessageService,
    private productColorService: ProductColorService,
    private productSizeService: ProductSizeService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllColors();
    this.getAllSize();
    this.getAllCategories();
  }

  public initializeForm() {
    this.addProductForm = this.formBuilder.group({
      productName: [''],
      productDescription: [''],
      productVariantDtos: this.formBuilder.array([]) // Initialize the FormArray to hold product variants
    });
  }

  getAllColors() {
    this.productColorService.getAllColor().subscribe((response) => {
      this.productColors = response;
    });
  }

  getAllSize() {
    this.productSizeService.getAllSize().subscribe((response) => {
      this.productSize = response;
    });
  }

  getAllCategories() {
    this.categoryService.getCategory().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  showDialog() {
    this.visible = true;
  }

  // Upload files
  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  // Initialize the product form with product and variants
  
get productVariantDtos() {
  return this.addProductForm.get('productVariantDtos') as FormArray;
}
createVariant(): FormGroup {
  return this.formBuilder.group({
    category: [null], // Default value for category, null or you can set a default id
    color: [null], // Default value for color, null or set a default value
    size: [null], // Default value for size
    stock: [null], // Default value for stock
    price: [null], // Default value for price
    image: [''] // Default value for image
  });
}
addVariant() {
  (this.addProductForm.get('productVariantDtos') as FormArray).push(this.createVariant());
}

removeVariant(index: number) {
  (this.addProductForm.get('productVariantDtos') as FormArray).removeAt(index);
}
  onSubmit() {
    console.log(this.addProductForm.value);
  }
}

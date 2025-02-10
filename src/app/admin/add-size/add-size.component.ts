import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { ProductSize } from '../../../model/productSize.model';
import { ProductSizeService } from '../../_service/product-size.service';

@Component({
  selector: 'app-add-size',
  imports: [
    AdminHeadersComponent,
    FormsModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
    ToastModule,
    NgFor,
    NgIf,
    TableModule,
    ReactiveFormsModule],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.scss'
})
export class AddSizeComponent implements OnInit {
  size: ProductSize[] = [];
  sizeForm!: FormGroup;
  constructor(
    private productSizeService: ProductSizeService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.getAllSize();
  }

  getAllSize(){
    this.productSizeService.getAllSize().subscribe((response)=>{
      this.size = response;
    })
  }

  initializeForm() {
    this.sizeForm = this.formBuilder.group({
      sizeName: ['', [Validators.required]]
    })
  }

  saveSize() {
    this.productSizeService.addNewSize(this.sizeForm.value).subscribe((response)=>{
      this.getAllSize();
      this.sizeForm.reset();
    })
  }

}

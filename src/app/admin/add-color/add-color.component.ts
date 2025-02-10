import { Component, OnInit } from '@angular/core';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductColorService } from '../../_service/product-color.service';
import { ProductColor } from '../../../model/productColor.model';

@Component({
  selector: 'app-add-color',
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
    ReactiveFormsModule
  ],
  
    standalone:true,
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.scss'
})
export class AddColorComponent implements OnInit {
  color: ProductColor[] = [];
  colorForm!: FormGroup;

  constructor(
    private productColorService: ProductColorService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.getAllColors();

  }

  getAllColors() {
    this.productColorService.getAllColor().subscribe((response: ProductColor[]) => {
      this.color = response
    })
  }

  initializeForm() {
    this.colorForm = this.formBuilder.group({
      colorName: ['', [Validators.required]],
      hexCode: ['', [Validators.required]]
    })
  }
  visible: boolean = false;
  

  saveColor() {
    this.productColorService.addNewColor(this.colorForm.value).subscribe((response) => {
      this.getAllColors();
    })

  }

}

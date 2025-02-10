import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { Category } from '../../../model/category.model';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../_service/category.service';
import { UserAuthService } from '../../_service/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
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
    standalone:true,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {

 
  categoryList: Category[] = [];
  addCategoryForm!: FormGroup;

   private subscriptions: Subscription[] = [];

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly categoryService: CategoryService,
    ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.fetchCategories();

  }
  initializeForm(): void {
      this.addCategoryForm = this.formBuilder.group({
        categoryName: ['', Validators.required],
      });
    }

    fetchCategories(): void {
      this.subscriptions.push(
        this.categoryService.getCategory().subscribe((response) => {
          this.categoryList = response;
        })
      );
    }

  saveCategory(){}
}

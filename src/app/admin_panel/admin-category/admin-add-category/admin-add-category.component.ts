import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { CategoryService } from '../../../_service/category.service';
import { Category } from '../../../../model/category.model';
import { Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserAuthService } from '../../../_service/user-auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-add-category',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    ReactiveFormsModule,
    Toast,
    NgFor,
  ],
  providers: [MessageService],
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.scss']
})
export class AdminAddCategoryComponent implements OnInit {
  categoryList: Category[] = [];
  addCategoryForm!: FormGroup;
  userToken!: string;
  isEditMode = false;
  editingCategoryId: number | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private messageService: MessageService,
    private userAuthService: UserAuthService
  ) { }

  initializeForm(): void {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userToken = this.userAuthService.getToken();

    this.fetchCategories();
  }

  fetchCategories(): void {
    this.subscriptions.push(
      this.categoryService.getCategory().subscribe((response) => {
        this.categoryList = response;
      })
    );
  }

  addCategory(): void {
    if (this.isEditMode) {
      this.updateCategory();
    } else {
      this.subscriptions.push(
        this.categoryService
          .addCategory(this.addCategoryForm.value)
          .pipe(switchMap(() => this.categoryService.getCategory()))
          .subscribe((response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Added Successfully' });
            this.categoryList = response;
            this.resetForm();
          })
      );
    }
  }

  editCategory(category: Category): void {
    this.isEditMode = true;
    this.editingCategoryId = category.categoryId;
    this.addCategoryForm.patchValue({
      categoryName: category.categoryName,
    });
  }

  updateCategory(): void {
    if (this.editingCategoryId !== null) {
      const updatedCategory = { id: this.editingCategoryId, ...this.addCategoryForm.value };

      this.subscriptions.push(
        this.categoryService
          .updateCategory(this.editingCategoryId, updatedCategory)
          .pipe(switchMap(() => this.categoryService.getCategory()))
          .subscribe((response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated Successfully' });
            this.categoryList = response;
            this.resetForm();
          })
      );
    }
  }

  resetForm(): void {
    this.addCategoryForm.reset();
    this.isEditMode = false;
    this.editingCategoryId = null;
  }
  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.subscriptions.push(
        this.categoryService
          .deleteCategory(categoryId) // Assumes `deleteCategory` exists in `CategoryService`
          .pipe(switchMap(() => this.categoryService.getCategory()))
          .subscribe((response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Deleted Successfully' });
            this.categoryList = response;
          })
      );
    }
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

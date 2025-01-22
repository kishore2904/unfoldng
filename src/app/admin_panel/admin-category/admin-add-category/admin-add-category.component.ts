import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { CategoryService } from '../../../_service/category.service';
import { Category } from '../../../../model/category.model';
import { Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-add-category',
  standalone:true,
  imports: [
    AdminHeaderComponent,
    ReactiveFormsModule,
    Toast,
      ],
      providers:[MessageService],
  templateUrl: './admin-add-category.component.html',
  styleUrl: './admin-add-category.component.scss'
})
export class AdminAddCategoryComponent implements OnInit{
  categoryList: Category[]=[];
  addCategoryForm!: FormGroup;

  private subscriptions: Subscription[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService:CategoryService,
    private messageService: MessageService,
  ){}

  initializeForm():void{
    this.addCategoryForm=this.formBuilder.group({
      categoryName: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.initializeForm();
    this.categoryService.getCategory().subscribe((response)=>{
      this.categoryList = response;
    })
  }

  addCategory(){
    this.subscriptions.push(
      this.categoryService.addCategory(this.addCategoryForm.value).pipe(
        switchMap(()=>{
          return this.categoryService.getCategory()
        })
      ).subscribe((response)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Added Successful' });
        setTimeout(() => {
        this.categoryList = response;
        this.addCategoryForm.reset();
        }, 2000);
        
        
      })
    )
    
  }

}

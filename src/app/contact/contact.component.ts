import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerQueryService } from '../_service/customer-query.service';
import { Toast } from 'primeng/toast';
import { LoadingComponent } from '../shared/loader/loader.component';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../_service/loading.service';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    LoadingComponent,
    Toast,
  ],
  standalone:true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers:[MessageService],
})
export class ContactComponent implements OnInit{
  queryForm!: FormGroup;
  constructor(
    private customerQueryService: CustomerQueryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private userAuthService: UserAuthService,
  ){}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.queryForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      userId: [null]
    })
  }

  submitQuery(){
    const userId = this.userAuthService.getUserId();
    if(this.queryForm.valid){

      const queryData = {
        ...this.queryForm.value,
        userId: userId 
      };
    this.loadingService.show();
    this.customerQueryService.submitQuery(queryData).subscribe((response)=>{
      this.loadingService.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted' });
    })
    }
    
    
  }


}

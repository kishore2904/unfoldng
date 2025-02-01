import { Component, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-forget-password',
  imports: [
    Toast,
    ReactiveFormsModule,
    NgIf,
    HeaderComponent
  ],
  providers: [MessageService],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly userService: UserService,
      private readonly userAuthService: UserAuthService,
      private messageService: MessageService,
      
    ) {}
    initialiseForm(): void {
      this.loginForm = this.formBuilder.group({
        userName: ['', [Validators.required,Validators.email]],
        userPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['',[Validators.required,Validators.minLength(6)]],
        confirmPassword: ['',[Validators.required,Validators.minLength(6)]],
      });
    
    }
    ngOnInit(): void {
      this.initialiseForm();
    }
    loginUser(): void {
      if (this.loginForm.valid) {
        
      } else {
        console.log('Form is invalid. Please check the input fields.');
      }
    }

}

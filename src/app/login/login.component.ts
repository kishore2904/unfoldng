import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { LoadingService } from '../_service/loading.service';
import { LoadingComponent } from '../shared/loader/loader.component';
import { HeaderComponent } from '../header/header.component';
import { EmailVerificationService } from '../_service/email-verification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    Toast,
    NgIf,
    LoadingComponent,
    HeaderComponent
  ],
  providers: [MessageService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  emailVerify:boolean=true;
  verifyEmail!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private emailVerificationService: EmailVerificationService,

  ) { }

  initialiseForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      address:['',[Validators.required]],
      password: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      confirmUserPassword: ['', [Validators.required]]
    });
    this.verifyEmail = this.formBuilder.group({
      code: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.loadingService.show();
      this.userService.loginUser(this.loginForm.value).subscribe((response: any) => {
        this.loadingService.hide();
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.users.roles)
        this.userAuthService.setUserId(response.users.user_id);

        const role = response.users.roles[0].role;
        if (role == 'Admin') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        } else if (role == 'User') {
          this.router.navigate(['/home']);
        }
      }, (error) => {
        if (error.error.type == 'R001') {
          this.loadingService.hide();
          this.loginForm.reset();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
        }

      })
    } else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
  }

  registerUser(): void {
    this.loadingService.show();
    this.emailVerify = false
    const verifyEmailAddress = {
      email: this.registerForm.get('emailAddress')?.value,
    }
    this.emailVerificationService.sendVerificationCode(verifyEmailAddress).subscribe((code)=>{
      this.loadingService.hide();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Verification Code sent to Email Address' });
    })
  }
  verifyCode(){
    if(this.verifyEmail.valid){
      const verifyEmailAddress = {
        email: this.registerForm.get('emailAddress')?.value,
        code: this.verifyEmail.get('code')?.value,
      }
      this.emailVerificationService.verifyCode(verifyEmailAddress).subscribe(()=>{
        if (this.registerForm.valid) {
          this.loadingService.show();
          this.userService.userRegister(this.registerForm.value).subscribe((response) => {
            this.loadingService.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created Successful. Please login again' });
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          }, (error) => {
            if (error.error.type != null) {
              this.loadingService.hide();
              this.loginForm.reset();
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
            }
    
          })
        }

      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
      })
    }
    
  }
}

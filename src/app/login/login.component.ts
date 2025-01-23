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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    Toast,
    NgIf
  ],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
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
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerForm = this.formBuilder.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
      emailAddress:['',[Validators.required]],
      confirmUserPassword: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe((response:any)=>{

        console.log(response.jwtToken);
        console.log(response);
        

        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.users.roles)
        this.userAuthService.setUserId(response.users.user_id);

        const role = response.users.roles[0].role;
        if(role == 'Admin'){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
          
          setTimeout(()=>{
            this.router.navigate(['/home']);
          },2000);
        }else if(role == 'User'){
          this.router.navigate(['/home']);
        }
      },(error)=>{
        if(error.error.type == 'R001'){
          console.log(error.error.type);
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

registerUser():void{
  if(this.registerForm.valid){
    this.userService.userRegister(this.registerForm.value).subscribe((response)=>{
      console.log(response);
    })
  }

  
}
}

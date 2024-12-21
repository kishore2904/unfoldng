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
  userForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private messageService: MessageService,
    
  ) {}

  initialiseForm(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  loginUser(): void {
    if (this.userForm.valid) {
      this.userService.loginUser(this.userForm.value).subscribe((response:any)=>{

        console.log(response.jwtToken);
        console.log(response);
        

        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.users.roles)

        const role = response.users.roles[0].role;
        if(role == 'Admin'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/user']);
        }
      },(error)=>{
        if(error.error.type == 'R001'){
          console.log(error.error.type);
          this.userForm.reset();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
          
          
          // setTimeout(() => {
          //   this.router.navigate(['/signup']);
          // }, 5000);
          // //this.router.navigate(['/signup']);
        }
        
      })
    } else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    HttpClientModule,
    Toast,
    NgIf
  ],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private messageService: MessageService,

  ) { }

  initialiseForm(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this.initialiseForm();
  }

  signUp() {
    console.log(this.signupForm.value);
    this.userService.userRegister(this.signupForm.value).subscribe((response: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Created Successfully' });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }, (error) => {
      if (error.error.type === 'A002') {
        this.signupForm.reset();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
      }
    })

  }

}

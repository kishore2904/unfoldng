import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';
import { User } from '../../../model/user.model';
import { UserAuthService } from '../../_service/user-auth.service';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    Menubar, 
    CommonModule,
    AdminHeadersComponent
  ],
  standalone:true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.userAuthService.getUserId(); // Replace with actual logged-in user ID
    this.userService.getUserDetails(userId  ).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

}

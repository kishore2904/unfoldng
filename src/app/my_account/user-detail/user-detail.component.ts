import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../../model/user.model';
import { MyAccountHeaderComponent } from '../my-account-header/my-account-header.component';
import { UserAuthService } from '../../_service/user-auth.service';

@Component({
  selector: 'app-user-detail',
  imports: [
    MyAccountHeaderComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
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
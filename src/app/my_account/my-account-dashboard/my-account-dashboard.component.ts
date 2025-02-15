import { Component, OnInit } from '@angular/core';
import { MyAccountHeaderComponent } from '../my-account-header/my-account-header.component';
import { User } from '../../../model/user.model';
import { UserAuthService } from '../../_service/user-auth.service';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-my-account-dashboard',
  imports: [MyAccountHeaderComponent],
  standalone:true,
  templateUrl: './my-account-dashboard.component.html',
  styleUrl: './my-account-dashboard.component.scss'
})
export class MyAccountDashboardComponent implements OnInit {
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

import { Component } from '@angular/core';
import { MyAccountHeaderComponent } from '../my-account-header/my-account-header.component';

@Component({
  selector: 'app-my-account-dashboard',
  imports: [MyAccountHeaderComponent],
  standalone:true,
  templateUrl: './my-account-dashboard.component.html',
  styleUrl: './my-account-dashboard.component.scss'
})
export class MyAccountDashboardComponent {

}

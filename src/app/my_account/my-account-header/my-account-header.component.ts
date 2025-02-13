import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-my-account-header',
  imports: [
    HeaderComponent,
    NgClass,
    NgIf,
    NgFor,
    ButtonModule
  ],
  standalone:true,
  templateUrl: './my-account-header.component.html',
  styleUrl: './my-account-header.component.scss'
})
export class MyAccountHeaderComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ){}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToUrl(url:string){
    this.router.navigate(['/'+url]);
  }
}

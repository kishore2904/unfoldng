import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminHeadersComponent } from '../admin-headers/admin-headers.component';

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
  ngOnInit(): void {
    
  }

}

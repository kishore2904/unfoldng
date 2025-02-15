import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-headers',
  imports: [
    Menubar,
    CommonModule,
    NgIf,
    NgFor,
    RouterModule
  ],
  standalone: true,
  templateUrl: './admin-headers.component.html',
  styleUrl: './admin-headers.component.scss'
})
export class AdminHeadersComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        route: '/admin',
        icon: 'pi pi-home',

      },
      
      
      {
        label: 'Products',
        icon: 'pi pi-cart-arrow-down',
        
        items: [
          {
            label: 'Add Product',
            route: '/admin-add-product',
          },
          {
            label: 'View Product',
            route: '/configuration',
          }
        ]
      },
      {
        label: 'Category',
        icon: 'pi pi-shop',
        route: '/admin-add-category',
      },
      {
        label: 'Color',
        icon: 'pi pi-palette',
        route: '/add-color',
      },
      {
        label: 'Size',
        route: '/add-size',
      },
      {
        label: 'Coupon',
        route: '/add-size',
      },
      {
        label: 'Vendor',
        route: '/add-size',
      },
      {
        label: 'Logout',
        route: '/logout',
        icon: 'pi pi-sign-out',

      },
      
    ];
  }

}

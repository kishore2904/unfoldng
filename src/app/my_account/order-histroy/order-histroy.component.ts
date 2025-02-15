import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MyAccountHeaderComponent } from '../my-account-header/my-account-header.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-order-histroy',
  imports: [
    TableModule,
    MyAccountHeaderComponent,
    HeaderComponent
  ],
  standalone:true,
  templateUrl: './order-histroy.component.html',
  styleUrl: './order-histroy.component.scss'
})
export class OrderHistroyComponent {

}

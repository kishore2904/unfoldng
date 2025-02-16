import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MyAccountHeaderComponent } from '../my-account-header/my-account-header.component';
import { HeaderComponent } from '../../header/header.component';
import { OrderService } from '../../_service/order.service';
import { Orders } from '../../../model/orders.model';
import { UserAuthService } from '../../_service/user-auth.service';

@Component({
  selector: 'app-order-histroy',
  imports: [
    TableModule,
    MyAccountHeaderComponent,
    HeaderComponent
  ],
  standalone: true,
  templateUrl: './order-histroy.component.html',
  styleUrls: ['./order-histroy.component.scss']
})
export class OrderHistroyComponent implements OnInit {
  order: Orders[] = [];

  constructor(
    private ordersService: OrderService,
    private userAuthService: UserAuthService,
  ) {}

  ngOnInit(): void {
    if (this.userAuthService.getUserId() != null) {
      this.ordersService.getUserOrder(this.userAuthService.getUserId()).subscribe((orders) => {
        // Filter the orders to only include those with status "completed"
        this.order = orders;
        console.log(this.order);
        
      });
    }
  }
}

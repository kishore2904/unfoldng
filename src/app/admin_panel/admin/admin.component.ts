import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] 
})
export class AdminComponent {

}


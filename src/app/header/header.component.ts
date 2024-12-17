import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private userAuthService: UserAuthService,
    private router: Router,
  ){}
  ngOnInit(): void {
    
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    console.log("logout");
    
     this.userAuthService.clear();
     this.router.navigate(['/login']);

  }

}

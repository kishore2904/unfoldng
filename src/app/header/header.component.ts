import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isMenuOpen = false;

  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ){}
  ngOnInit(): void {
    
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
     this.userAuthService.clear();
     this.router.navigate(['/home']);
     console.log("logout");
  }

  public userRole():boolean{
    return this.userService.roleMatch(['Admin']);
  }

}

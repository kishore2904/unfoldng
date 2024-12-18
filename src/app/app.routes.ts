import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent,canActivate:[AuthGuard],data:{roles:['User']} },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'about', component: AboutComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, canActivate:[AuthGuard],data:{roles:['Admin']}}
    
];

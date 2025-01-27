import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './_auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin_panel/admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { AdminAddCategoryComponent } from './admin_panel/admin-category/admin-add-category/admin-add-category.component';
import { AdminAddProductComponent } from './admin_panel/admin-product/admin-add-product/admin-add-product.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: UserComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'about', component: AboutComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
    { path: 'signup', component: SignupComponent },
    { path: 'product/:categoryId/:productId', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin-add-category', component: AdminAddCategoryComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
    { path: 'admin-add-product', component: AdminAddProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }

];

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  if (userAuthService.getToken() !== null) {
    const roles = route.data['roles'] as Array<string>;

    if (roles) {
      const match = userService.roleMatch(roles);

      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }

    return true;
  }

  router.navigate(['/login']);
  return false;
};

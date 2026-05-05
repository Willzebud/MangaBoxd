import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user-service';
import { AuthStore } from '../stores/auth/auth.store';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  //const authService = inject(AuthUserService);
  const authStore = inject(AuthStore)
  const token = authStore.accessToken()

  return !token ? true : router.createUrlTree(['/homelist']);
};

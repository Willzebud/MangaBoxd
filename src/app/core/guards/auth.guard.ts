import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthUserService } from "../services/auth-user-service";

export const authGuard: CanActivateFn = () => {
    const router = inject(Router)
    const authService = inject(AuthUserService)

    const token = authService.getToken()
    if(token){
        return true
    } 
        return router.createUrlTree(['/login']);
}
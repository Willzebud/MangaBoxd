import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { HomeList } from './home-list/home-list';
import { MainContainer } from './main/containers/main-container/main-container';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./login/login').then((m) => m.Login),
    },
    {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./register/register').then((m) => m.Register),
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./main/main.routes').then((m) => m.mainRoute),
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];

import { Routes } from '@angular/router';
import { MainContainer } from './containers/main-container/main-container';
import { HomeList } from '../home-list/home-list';

export const mainRoute: Routes = [
  {
    path: '',
    component: MainContainer,
    children: [
      {
        path: 'homelist',
        loadComponent: () => import('../home-list/home-list').then((m) => m.HomeList),
      },
      {
        path: 'userprofil',
        loadComponent: () => import('../user-profil/user-profil').then((m) => m.UserProfil)
      },
      {
        path: 'createlist',
        loadComponent: () => import('../create-list/create-list').then((m) => m.CreateList)
      },
      {
        path: 'updatelist',
        loadComponent: () => import('../update-list/update-list').then((m) => m.UpdateList)
      },
      {
        path: '**',
        redirectTo: 'homelist'
      }
    ],
  },
];

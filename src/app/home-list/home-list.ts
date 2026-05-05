import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../core/services/auth-user-service';
import { MangaCoverList } from "../components/manga-cover-list/manga-cover-list";
import { MangaListSection } from "../components/manga-list-section/manga-list-section";
import { AuthStore } from '../core/stores/auth/auth.store';

@Component({
  selector: 'app-home-list',
  imports: [MangaListSection],
  templateUrl: './home-list.html',
  styleUrl: './home-list.scss',
})
export class HomeList {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore)
  //private readonly authService = inject(AuthUserService);


  /*onLogOut() {
    this.authStore.logout()
    this.authStore.clearStorage()
    //this.authService.removeUserName();
    //this.authService.removeToken();
    //this.router.navigate(['/login']);
  }*/
}

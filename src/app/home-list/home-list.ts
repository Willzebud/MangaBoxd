import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../core/services/auth-user-service';
import { MangaCoverList } from "../components/manga-cover-list/manga-cover-list";
import { MangaListSection } from "../components/manga-list-section/manga-list-section";

@Component({
  selector: 'app-home-list',
  imports: [MangaCoverList, MangaListSection],
  templateUrl: './home-list.html',
  styleUrl: './home-list.scss',
})
export class HomeList {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);

  onLogOut() {
    this.authService.removeUserName();
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}

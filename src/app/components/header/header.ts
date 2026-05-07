import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUserService } from '../../core/services/auth-user-service';
import { SvgIcons } from '../svg-icons/svg-icons';
import { NgClass } from '@angular/common';
import { AuthStore } from '../../core/stores/auth/auth.store';
import { MangaListStore } from '../../core/stores/manga/manga.store';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SvgIcons, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  //private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore)
  private readonly mangaStore = inject(MangaListStore)
  public isActive = false;

  public toggleMenu() {
    this.isActive = !this.isActive;
  }

  public onLogOut() {
    //this.authService.removeToken();
    this.authStore.logout()
    this.mangaStore.cleanStore()

    //this.router.navigate(['/login']);
  }
}

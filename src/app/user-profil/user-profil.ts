import { Component, inject } from '@angular/core';
import { Header } from "../components/header/header";
import { ActionBarProfil } from "../components/action-bar-profil/action-bar-profil";
import { ProfilMangaListSection } from "../components/profil-manga-list-section/profil-manga-list-section";
import { AuthUserService } from '../core/services/auth-user-service';

@Component({
  selector: 'app-user-profil',
  imports: [ActionBarProfil, ProfilMangaListSection],
  templateUrl: './user-profil.html',
  styleUrl: './user-profil.scss',
})
export class UserProfil {
  private readonly authService = inject(AuthUserService);
  public readonly userName = this.authService.getUserName();
}

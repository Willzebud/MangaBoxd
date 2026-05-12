import { Component, computed, inject, signal } from '@angular/core';
import { Header } from "../components/header/header";
import { ActionBarProfil } from "../components/action-bar-profil/action-bar-profil";
import { ProfilMangaListSection } from "../components/profil-manga-list-section/profil-manga-list-section";
import { AuthUserService } from '../core/services/auth-user-service';
import { ProfilView } from '../core/type/profil-type';
import { MangaListSection } from '../components/manga-list-section/manga-list-section';
import { MangaListStore } from '../core/stores/manga/manga.store';

@Component({
  selector: 'app-user-profil',
  imports: [ActionBarProfil, ProfilMangaListSection, MangaListSection],
  templateUrl: './user-profil.html',
  styleUrl: './user-profil.scss',
})
export class UserProfil {
  //private readonly authService = inject(AuthUserService);
  //public readonly userName = this.authService.getUserName();
  private readonly mangaListStore = inject(MangaListStore);
    public myFavMangaList = computed(() => this.mangaListStore.myFavMangaList())

  public readonly profilView = signal<ProfilView>('profil')

}

import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MangaCoverList } from '../manga-cover-list/manga-cover-list';
import { MangaService } from '../../core/services/manga-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MangaListStore } from '../../core/stores/manga/manga.store';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthStore } from '../../core/stores/auth/auth.store';
import { MangaList } from '../../core/models/manga-models';

@Component({
  selector: 'app-manga-list-section',
  imports: [MangaCoverList, DatePipe, SvgIcons],
  templateUrl: './manga-list-section.html',
  styleUrl: './manga-list-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaListSection {
  //public mangaService = inject(MangaService)
  private readonly mangaListStore = inject(MangaListStore);
  //public mangaLists = computed(() => this.mangaListStore.mangaList().filter(m => m.isPublic));
  public myFavMangaList = computed(() => this.mangaListStore.myFavMangaList())
  public isDisabled = computed(() => this.mangaListStore.loading())

  public mangaListArray = input.required<MangaList[]>()

  constructor() {
    this.mangaListStore.getMangaList();
    this.mangaListStore.getMyFavoritesMangaList();
  }

  protected getIcon(listId: string): string {
    return  `/assets/icons/star-${this.isFav(listId) ? 'fully-' : ''}svgrepo-com.svg`
  }

  protected isFav(listId: string): boolean {
    const list = this.myFavMangaList();
    return list.some((fav) => fav.id === listId);
    
  }

  protected addToFavList(listId: string): void {
    if (!this.isFav(listId)) {
      this.mangaListStore.postMangaListFav(listId);
    } else {
      this.mangaListStore.deleteMyFavMangaList(listId);
    }
  }
}

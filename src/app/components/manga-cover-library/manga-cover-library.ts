import { Component, computed, inject, input } from '@angular/core';
import { MangaListStore } from '../../core/stores/manga/manga.store';

@Component({
  selector: 'app-manga-cover-library',
  imports: [],
  templateUrl: './manga-cover-library.html',
  styleUrl: './manga-cover-library.scss',
})
export class MangaCoverLibrary {
  private readonly mangaStore = inject(MangaListStore)
  public coversUrl = input.required<string[]>()
  public mangaList = computed(() => this.mangaStore.mangaList())
}

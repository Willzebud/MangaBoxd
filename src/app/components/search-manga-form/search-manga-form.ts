import { Component, inject, signal } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MangaService } from '../../core/services/manga-service';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-manga-form',
  imports: [],
  templateUrl: './search-manga-form.html',
  styleUrl: './search-manga-form.scss',
})
export class SearchMangaForm {
  public readonly searchInput = signal<string>('');
  public mangaService = inject(MangaService);
  public mangaData = toSignal(
    toObservable(this.searchInput).pipe(
      debounceTime(1000),
      switchMap((search) => (search.trim() ? this.mangaService.getMangas(search) : of([]))),
    ),
    {initialValue: []}
  );

  onSearchUpdated(text: string) {
    this.searchInput.set(text);
  }
}

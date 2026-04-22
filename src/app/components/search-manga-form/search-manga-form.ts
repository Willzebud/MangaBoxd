import { Component, inject, signal } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MangaService } from '../../core/services/manga-service';
import { of } from 'rxjs';
import { Manga } from '../../core/models/manga-models';
import { SvgIcons } from '../svg-icons/svg-icons';

@Component({
  selector: 'app-search-manga-form',
  imports: [SvgIcons],
  templateUrl: './search-manga-form.html',
  styleUrl: './search-manga-form.scss',
})
export class SearchMangaForm {
  private readonly mangaService = inject(MangaService);
  public readonly searchInput = signal<string>('');
  public readonly selectedMangas = signal<Manga[]>([]);

  public readonly mangaData = toSignal(
    toObservable(this.searchInput).pipe(
      debounceTime(1000),
      switchMap((search) => (search.trim() ? this.mangaService.getMangas(search) : of([]))),
    ),
    { initialValue: [] },
  );

  public onSearchUpdated(text: string): void {
    this.searchInput.set(text);
  }

  public onClickAddManga(manga: Manga): void {
    this.selectedMangas.update((value) => [...value, manga]);
    this.searchInput.set('');
  }

  public deleteMangaFromList(mangaId: number): void {
    this.selectedMangas.update((value) => value.filter((manga) => manga.jikanId !== mangaId));
  }
}

import { Component, inject, input, output, OutputEmitterRef, signal } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MangaService } from '../../core/services/manga-service';
import { of } from 'rxjs';
import { Manga, MangaListCreate } from '../../core/models/manga-models';
import { SvgIcons } from '../svg-icons/svg-icons';
import { SlicePipe } from '@angular/common';
import { FieldState, FieldTree, form } from '@angular/forms/signals';

@Component({
  selector: 'app-search-manga-form',
  imports: [SvgIcons, SlicePipe],
  templateUrl: './search-manga-form.html',
  styleUrl: './search-manga-form.scss',
})
export class SearchMangaForm {
  private readonly mangaService = inject(MangaService);
  public readonly searchInput = signal<string>('');
  public readonly selectedMangas = signal<Manga[]>([]);
  public readonly isClicked = signal(false)
  public onSubmit: OutputEmitterRef<void> = output();
  public mangaFormField = input.required<FieldState<MangaListCreate[], string>>()

  public readonly mangaData = toSignal(
    toObservable(this.searchInput).pipe(
      debounceTime(800),
      switchMap((search) => (search.trim() ? this.mangaService.getMangas(search) : of([]))),
    ),
    { initialValue: [] },
  );

  public onSearchUpdated(text: string): void {
    this.isClicked.set(false)
    this.searchInput.set(text);
  }

  public onClickAddManga(manga: MangaListCreate): void {

    this.isClicked.set(true)
    const data: MangaListCreate = {
      jikanId: manga.jikanId,
      title: manga.title,
      coverUrl: manga.coverUrl,
      synopsis: manga.synopsis,
    }
    this.mangaFormField().value.set([data])
    this.searchInput.set('');
  }

  public deleteMangaFromList(mangaId: number): void {
    this.selectedMangas.update((mangaArray) =>
      mangaArray.filter((manga) => manga.jikanId !== mangaId),
    );
  }

  public isMangaAlreadyAdded(mangaId: number): boolean {
    return this.selectedMangas().some((manga) => manga.jikanId === mangaId);
  }

  public onClickSubmitMangaList(): void {
    this.onSubmit.emit()
  }
}

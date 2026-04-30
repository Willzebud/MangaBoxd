import { Component, effect, inject, input, signal } from '@angular/core';
import { SearchMangaForm } from '../search-manga-form/search-manga-form';
import { Router } from '@angular/router';
import { MangaService } from '../../core/services/manga-service';
import {
  MangaList,
  MangaListCreateFormModel,
} from '../../core/models/manga-models';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-create-list-form',
  imports: [SearchMangaForm, FormField],
  templateUrl: './create-list-form.html',
  styleUrl: './create-list-form.scss',
})
export class CreateListForm {
  public readonly isSubmitting = signal(false);
  public isListPublic = signal<boolean>(true);
  public description = signal<string>('');
  private readonly router = inject(Router);
  private readonly mangaService = inject(MangaService);
  public btnText = input.required<string>();
  public mangaList = input<MangaList>();

  constructor() {
    effect(() => {
      const manga = this.mangaList();
      if (manga) {
        this.createListForm.title().value.set(manga.title);
        this.createListForm.mangas().value.set(manga.mangas);
        this.createListForm.description().value.set(manga.description);
        this.createListForm.isPublic().value.set(manga.isPublic);
        this.isListPublic.set(manga.isPublic);
      }
    });
  }

  private readonly mangaListModel = signal<MangaListCreateFormModel>({
    title: '',
    description: '',
    isPublic: true,
    mangas: [],
  });

  private readonly errorMessage = signal<string | null>(null);

  public createListForm = form(this.mangaListModel, (path) => {
    required(path.title, { message: 'List title is required' });
  });

  public onClickPublic() {
    this.createListForm.isPublic().value.set(!this.createListForm.isPublic().value());
    this.isListPublic.update((value) => !value);
  }

  public onSubmitMangaList(): void {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    if (this.mangaList()) {
      const { mangas, ...form} = this.createListForm().value()
      const updatedMangas = mangas.map(m => {
        const { addedAt, ...updatedManga } = m;
        return updatedManga
      })
      this.mangaService.updateMangaList(this.mangaList()!.id, { mangas: updatedMangas, ...form}).subscribe({
        next: (response) => {
          alert('mangalist updated successfully');
          this.isSubmitting.set(false);
          this.router.navigate(['/homelist']);
          console.log(response);
        },
        error: () => {
          this.errorMessage.set('Update manga list failed');
          this.isSubmitting.set(false);
        },
      })
    } else {
      this.mangaService.postMangaList(this.createListForm().value()).subscribe({
        next: (response) => {
          alert('mangalist added successfully');
          this.isSubmitting.set(false);
          this.router.navigate(['/homelist']);
        },
        error: () => {
          this.errorMessage.set('Adding manga list failed');
          this.isSubmitting.set(false);
        },
      });
    }
  }

  public handleClickSubmitMangaList(): void {
    if (!this.mangaListModel().title.trim() || this.mangaListModel().mangas.length === 0) {
      alert('A list must include at least one title and one film');
      return;
    }
    this.onSubmitMangaList();
  }
}

import { Component, inject, signal } from '@angular/core';
import { SearchMangaForm } from '../search-manga-form/search-manga-form';
import { Router } from '@angular/router';
import { MangaService } from '../../core/services/manga-service';
import {
  Manga,
  MangaListCreate,
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
  private readonly router = inject(Router);
  private readonly mangaService = inject(MangaService);

  public isListPublic = signal<boolean>(true);

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
    this.isListPublic.set(true);
  }

  public onClickPrivate() {
    this.isListPublic.set(false);
  }

  public onSubmitMangaList(): void {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    this.mangaService.postMangaList(this.mangaListModel()).subscribe({
      next: (response) => {
        alert('mangalist added successfully');
        this.isSubmitting.set(false);
        this.router.navigate(['/homelist']);
        console.log("Test POST REQUEST", response)
      },
      error: () => {
        this.errorMessage.set('Adding manga list failed');
        this.isSubmitting.set(false);
      },
    });
  }
}

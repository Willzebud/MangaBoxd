import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MangaCoverList } from '../manga-cover-list/manga-cover-list';
import { MangaService } from '../../core/services/manga-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MangaListStore } from '../../core/stores/manga/manga.store';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthStore } from '../../core/stores/auth/auth.store';
import { MangaList } from '../../core/models/manga-models';
import { Router } from '@angular/router';
import { CommentsListStore } from '../../core/stores/comments/comments.store';
import { CommentResponse } from '../../core/models/comments-models';
import { map, switchMap, tap } from 'rxjs';

type CommentsResponse = {
  id: string;
  mangaListId: string;
  content: string;
  createdAt: string;
};


@Component({
  selector: 'app-manga-list-section',
  imports: [MangaCoverList, DatePipe, SvgIcons],
  templateUrl: './manga-list-section.html',
  styleUrl: './manga-list-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListSection {
  private readonly mangaListStore = inject(MangaListStore);
  private readonly router = inject(Router);
  public myFavMangaList = computed(() => this.mangaListStore.myFavMangaList());
  public isDisabled = computed(() => this.mangaListStore.loading());

  public mangaListArray = input.required<MangaList[]>();

  constructor() {
    this.mangaListStore.getMangaList();
    this.mangaListStore.getMyFavoritesMangaList();
    effect(() => {
      this.mangaListStore.getCommentsNumberByListId();
    })
  }

  private commentsArray = toSignal(
    this.mangaListStore.getCommentsNumberByListId().pipe(
      map((commentArray) => commentArray.flat())
    ),
    {initialValue: []}
  );

  protected getCommentsNumber(listId: string): number {
    return this.commentsArray().filter(
      (data) => data.mangaListId === listId
    ).length;
  }

  protected getIcon(listId: string): string {
    return `/assets/icons/star-${this.isFav(listId) ? 'fully-' : ''}svgrepo-com.svg`;
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

  protected onClickDetailList(listId: string): void {
    this.router.navigate([`/detaillist`, listId]);
  }
}

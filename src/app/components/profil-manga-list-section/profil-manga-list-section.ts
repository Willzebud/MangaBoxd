import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../core/services/manga-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MangaCoverList } from '../manga-cover-list/manga-cover-list';
import { AuthUserService } from '../../core/services/auth-user-service';
import { SvgIcons } from '../svg-icons/svg-icons';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SortAndFilterControls } from '../sort-and-filter-controls/sort-and-filter-controls';

@Component({
  selector: 'app-profil-manga-list-section',
  imports: [DatePipe, MangaCoverList, SvgIcons, SortAndFilterControls],
  templateUrl: './profil-manga-list-section.html',
  styleUrl: './profil-manga-list-section.scss',
})
export class ProfilMangaListSection {
  private readonly router = inject(Router);

  private refreshList$ = new BehaviorSubject<void>(undefined);

  public mangaService = inject(MangaService);
  private dataList$ = this.refreshList$.pipe(switchMap(() => this.mangaService.getMyMangaList()));
  public mangaLists = toSignal(this.dataList$, {
    initialValue: [],
  });

  public listPublicOrPrivate = signal(true);
  public isMangaListFiltered = signal(false);
  public listSortedByDate = signal(false);
  public isMangaListSorted = signal(false);

  public mangaListFilter = computed(() => {
    let list = [...this.mangaLists()];

    if (this.isMangaListFiltered()) {
      list = list.filter((list) => list.isPublic === this.listPublicOrPrivate());
    }

    if (this.isMangaListSorted()) {
      list.sort((date1, date2) => {
        const dateA = new Date(date1.createdAt).getTime();
        const dateB = new Date(date2.createdAt).getTime();

        return this.listSortedByDate() ? dateA - dateB : dateB - dateA;
      });
    }
    return list;
  });

  public onClickFilter() {
    this.listPublicOrPrivate.update((value) => !value);
    this.isMangaListFiltered.set(true);
  }

  public onClickSorted() {
    this.listSortedByDate.update((value) => !value);
    this.isMangaListSorted.set(true);
  }

  public onClickReset() {
    this.listSortedByDate.set(false);
    this.listPublicOrPrivate.set(true);
    this.isMangaListFiltered.set(false);
    this.isMangaListSorted.set(false);
  }

  public onClickCreateList(): void {
    this.router.navigate(['/createlist']);
  }

  public onClickListDelete(listId: string): void {
    this.mangaService.deleteMangaList(listId).subscribe(() => {
      alert('List deleted');
      this.refreshList$.next();
    });
  }
}

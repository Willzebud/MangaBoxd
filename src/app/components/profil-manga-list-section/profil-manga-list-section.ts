import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../core/services/manga-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MangaCoverList } from '../manga-cover-list/manga-cover-list';
import { AuthUserService } from '../../core/services/auth-user-service';
import { SvgIcons } from '../svg-icons/svg-icons';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-profil-manga-list-section',
  imports: [DatePipe, MangaCoverList, SvgIcons],
  templateUrl: './profil-manga-list-section.html',
  styleUrl: './profil-manga-list-section.scss',
})
export class ProfilMangaListSection {
  private readonly router = inject(Router);
  private refreshList$ = new BehaviorSubject<void>(undefined)

  public mangaService = inject(MangaService);
  private dataList$ = this.refreshList$.pipe(switchMap(() => this.mangaService.getMangaList()));
  public mangaLists = toSignal(this.dataList$);

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

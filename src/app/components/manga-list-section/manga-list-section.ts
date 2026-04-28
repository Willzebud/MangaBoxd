import { Component, inject } from '@angular/core';
import { MangaCoverList } from "../manga-cover-list/manga-cover-list";
import { MangaService } from '../../core/services/manga-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manga-list-section',
  imports: [MangaCoverList, DatePipe],
  templateUrl: './manga-list-section.html',
  styleUrl: './manga-list-section.scss',
})
export class MangaListSection {
  public mangaService = inject(MangaService)
  public mangaLists = toSignal(this.mangaService.getMangaList())
}

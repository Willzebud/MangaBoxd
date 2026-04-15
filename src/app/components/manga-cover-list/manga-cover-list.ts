import { Component, inject } from '@angular/core';
import { MangaService } from '../../core/services/manga-service';
import { CommonModule, SlicePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manga-cover-list',
  imports: [SlicePipe, CommonModule],
  templateUrl: './manga-cover-list.html',
  styleUrl: './manga-cover-list.scss',
})
export class MangaCoverList {
  private mangaService = inject(MangaService);
  public mangas = toSignal(this.mangaService.getManga())

}

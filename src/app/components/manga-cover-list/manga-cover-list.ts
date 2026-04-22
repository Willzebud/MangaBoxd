import { Component, inject, input } from '@angular/core';
import { MangaService } from '../../core/services/manga-service';
import { CommonModule, SlicePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Manga, MangaList } from '../../core/models/manga-models';

@Component({
  selector: 'app-manga-cover-list',
  imports: [SlicePipe, CommonModule],
  templateUrl: './manga-cover-list.html',
  styleUrl: './manga-cover-list.scss',
})
export class MangaCoverList {
  public dataArray = input.required<Manga[]>()
}

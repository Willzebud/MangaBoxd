import { Component, inject } from '@angular/core';
import { MangaCoverList } from "../manga-cover-list/manga-cover-list";
import { SvgIcons } from "../svg-icons/svg-icons";
import { MangaService } from '../../core/services/manga-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manga-list-section',
  imports: [MangaCoverList, SvgIcons],
  templateUrl: './manga-list-section.html',
  styleUrl: './manga-list-section.scss',
})
export class MangaListSection {
  private mangaService = inject(MangaService)
  public mangaLists = toSignal(this.mangaService.getMangaList())

  //test(){console.log("MangaList", this.mangaLists)}
}

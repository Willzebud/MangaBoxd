import { Component } from '@angular/core';
import { MangaCoverList } from "../manga-cover-list/manga-cover-list";
import { SvgIcons } from "../svg-icons/svg-icons";

@Component({
  selector: 'app-manga-list-section',
  imports: [MangaCoverList, SvgIcons],
  templateUrl: './manga-list-section.html',
  styleUrl: './manga-list-section.scss',
})
export class MangaListSection {}

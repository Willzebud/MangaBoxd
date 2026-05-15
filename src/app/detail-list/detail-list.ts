import { Component, computed, inject, input } from '@angular/core';
import { MangaCoverLibrary } from '../components/manga-cover-library/manga-cover-library';
import { MangaListStore } from '../core/stores/manga/manga.store';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '../core/stores/auth/auth.store';
import { MangaService } from '../core/services/manga-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { EMPTY } from 'rxjs';
import { CommentSection } from "../components/comment-section/comment-section";
import { MangaList } from '../core/models/manga-models';

@Component({
  selector: 'app-detail-list',
  imports: [MangaCoverLibrary, CommentSection],
  providers: [DatePipe],
  templateUrl: './detail-list.html',
  styleUrl: './detail-list.scss',
})
export class DetailList {
  private readonly mangaStore = inject(MangaListStore);
  private readonly authStore = inject(AuthStore);
  private readonly mangaService = inject(MangaService);
  public id = input.required<string>();

  public userName = computed(() => this.authStore.user()?.firstname);
  public mangasCover = computed(() => this.mangaStore.getMangaCoversByListId(this.id()) ?? []);
  private datenow = Date.now();
  private datePipe = inject(DatePipe)

  public mangaListById = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.mangaService.getMangaListById(params),
  });

  public dateFormat() {
    const listDate =
      this.mangaListById.value()?.updatedAt === this.mangaListById.value()?.createdAt
        ? this.mangaListById.value()?.createdAt
        : this.mangaListById.value()?.updatedAt;

    if (!listDate) {
      return;
    }

    const newDate = this.datenow - new Date(listDate).getTime()
    const dateFormated = this.datePipe.transform(newDate, 'd')

    return `${dateFormated}`;
  }
}

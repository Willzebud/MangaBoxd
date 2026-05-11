import { Component, computed, effect, inject, input } from '@angular/core';
import { CreateListForm } from '../components/create-list-form/create-list-form';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MangaService } from '../core/services/manga-service';
import { switchMap } from 'rxjs';
import { MangaListStore } from '../core/stores/manga/manga.store';

@Component({
  selector: 'app-update-list',
  imports: [CreateListForm],
  templateUrl: './update-list.html',
  styleUrl: './update-list.scss',
})
export class UpdateList {
  public id = input.required<string>();
  public mangaService = inject(MangaService);
  private readonly mangaStore = inject(MangaListStore);

  /*public mangaListById = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.mangaService.getMangaListById(id)))
    )*/
  
  public mangaListById = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.mangaService.getMangaListById(params),
  });
}

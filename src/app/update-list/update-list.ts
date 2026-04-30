import { Component, computed, effect, inject, input } from '@angular/core';
import { CreateListForm } from "../components/create-list-form/create-list-form";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MangaService } from '../core/services/manga-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-update-list',
  imports: [CreateListForm],
  templateUrl: './update-list.html',
  styleUrl: './update-list.scss',
})
export class UpdateList {
  public id = input.required<string>()
  public mangaService = inject(MangaService)
  public mangaListById = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.mangaService.getMangaListById(id)))
    )
}

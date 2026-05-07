import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Manga, MangaList } from '../../models/manga-models';
import { switchOp, withDevtools, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { MangaService } from '../../services/manga-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

const STORAGE_SYNC_KEY = 'user';

type MangaListState = {
  myMangaList: MangaList[];
  mangaList: MangaList[];
  loading: boolean;
  loadList: boolean;
};

const mangaListInitialState: MangaListState = {
  myMangaList: [],
  mangaList: [],
  loading: false,
  loadList: false,
};

export const MangaListStore = signalStore(
  { providedIn: 'root' },
  withState(mangaListInitialState),
  withDevtools(STORAGE_SYNC_KEY),

  withMethods((store, mangaService = inject(MangaService)) => ({

    getMangaList: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return mangaService.getMangaList().pipe(
            tap((data) => {
              patchState(store, {
                mangaList: data,
                loading: false,
              });
            }),
          );
        }),
      ),
    ),

    getMyMangaList: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return mangaService.getMyMangaList().pipe(
            tap((data) => {
              patchState(store, {
                myMangaList: data,
                loading: false,
              });
            }),
          );
        }),
      ),
    ),

    deleteMangaList: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((listId) => {
          return mangaService.deleteMangaList(listId).pipe(
            tap((data) => {
              patchState(store, {
                loading: false,
                loadList: true,
              });
            }),
          );
        }),
      ),
    ),

    cleanStore() {
      patchState(store, { myMangaList: [], mangaList: [] });
    },
  })),

  withHooks({
    onInit(store) {
      toObservable(store.loadList).subscribe((flag) => {
        if (flag) {
          store.getMyMangaList();
        }
      });
    },
  }),
);

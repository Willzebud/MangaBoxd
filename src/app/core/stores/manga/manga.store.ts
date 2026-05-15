import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Manga, MangaList, MangaListCreateFormModel } from '../../models/manga-models';
import { switchOp, withDevtools, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { MangaService } from '../../services/manga-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, distinctUntilChanged, EMPTY, forkJoin, map, pipe, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Comments } from '../../services/comments.service';

const STORAGE_SYNC_KEY = 'mangas';

type MangaListState = {
  myFavMangaList: MangaList[];
  myMangaList: MangaList[];
  mangaList: MangaList[];
  loading: boolean;
};

const mangaListInitialState: MangaListState = {
  myFavMangaList: [],
  myMangaList: [],
  mangaList: [],
  loading: false,
};

export const MangaListStore = signalStore(
  { providedIn: 'root' },
  withState(mangaListInitialState),
  withDevtools(STORAGE_SYNC_KEY),
  withStorageSync(STORAGE_SYNC_KEY),
  withComputed((store) => ({
    listsId: computed(() => store.mangaList().map((list) => list.id)),
  })),

  withMethods(
    (
      store,
      router = inject(Router),
      mangaService = inject(MangaService),
      commentsService = inject(Comments),
    ) => ({

      getCommentsNumberByListId() {
        return forkJoin(
          store.listsId().map((id) => commentsService.getComments(id))
        )
      },

      getMangaCoversByListId(listId: string) {
        if (!listId) {
          return;
        }
        const mangasList = store.mangaList().find((m) => m.id === listId);

        if (!mangasList) {
          return;
        }
        return mangasList?.mangas.map((m) => m.coverUrl);
      },

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

      getMyFavoritesMangaList: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            mangaService.getMyFavoritesMangaList().pipe(
              tap((data) => {
                patchState(store, {
                  myFavMangaList: data,
                  loading: false,
                });
              }),
            ),
          ),
        ),
      ),

      postMangaList: rxMethod<MangaListCreateFormModel>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { loading: true })),
          switchMap((mangaList) =>
            mangaService.postMangaList(mangaList).pipe(
              tap((data) => {
                (patchState(store, {
                  mangaList: [...store.mangaList(), data],
                  myMangaList: [...store.myMangaList(), data],
                  loading: false,
                }),
                  router.navigate(['/homelist']));
              }),
            ),
          ),
        ),
      ),

      postMangaListFav: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((listId) => {
            return mangaService.postMangaListFav(listId).pipe(
              tap((data) => {
                patchState(store, {
                  myFavMangaList: data,
                  loading: false,
                });
              }),
            );
          }),
        ),
      ),

      deleteMyFavMangaList: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((listId) =>
            mangaService.deleteMangaListFav(listId).pipe(
              tap(() => {
                patchState(store, {
                  myFavMangaList: store.myFavMangaList().filter((m) => m.id !== listId),
                  loading: false,
                });
              }),
            ),
          ),
        ),
      ),

      updateMangaList: rxMethod<{ id: string; model: MangaListCreateFormModel }>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((mangaList) =>
            mangaService.updateMangaList(mangaList.id, mangaList.model).pipe(
              tap((data) => {
                (patchState(store, {
                  mangaList: [...store.mangaList(), data],
                  myMangaList: [...store.myMangaList(), data],
                  loading: false,
                }),
                  router.navigate(['/homelist']));
              }),
            ),
          ),
        ),
      ),

      deleteMangaList: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((listId) => {
            return mangaService.deleteMangaList(listId).pipe(
              catchError((error) => {
                return EMPTY;
              }),
              tap(() => {
                patchState(store, {
                  mangaList: store.mangaList().filter((m) => m.id !== listId),
                  myMangaList: store.myMangaList().filter((m) => m.id !== listId),
                  loading: false,
                });
              }),
            );
          }),
        ),
      ),

      cleanStore() {
        patchState(store, { myMangaList: [], mangaList: [] });
      },
    }),
  ),

  /*withHooks({
    onInit(store) {
      toObservable(store.loadList).subscribe((flag) => {
        if (flag) {
          store.getMyMangaList();
        }
      });
    },
  }),*/
);

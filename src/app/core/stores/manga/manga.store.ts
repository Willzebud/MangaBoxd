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
import { inject } from '@angular/core';
import { MangaService } from '../../services/manga-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, distinctUntilChanged, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

const STORAGE_SYNC_KEY = 'user';

type MangaListState = {
  myMangaList: MangaList[];
  mangaListArray: MangaList[];
  loading: boolean;
};

const mangaListInitialState: MangaListState = {
  myMangaList: [],
  mangaListArray: [],
  loading: false,
};

export const MangaListStore = signalStore(
  { providedIn: 'root' },
  withState(mangaListInitialState),
  withDevtools(STORAGE_SYNC_KEY),

  withMethods((store, router = inject(Router), mangaService = inject(MangaService)) => ({
    getMangaList: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return mangaService.getMangaList().pipe(
            tap((data) => {
              patchState(store, {
                mangaListArray: data,
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

    postMangaList: rxMethod<MangaListCreateFormModel>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { loading: true })),
        switchMap((mangaList) =>
          mangaService.postMangaList(mangaList).pipe(
            tap((data) => {
              (patchState(store, {  
                mangaListArray: [...store.mangaListArray(), data],
                myMangaList: [...store.myMangaList(), data],
                loading: false
            }), 
            router.navigate(['/homelist']));
            }),
          ),
        ),
      ),
    ),


    updateMangaList: rxMethod<{id: string, model:  MangaListCreateFormModel}>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { loading: true })),
        switchMap((mangaList) =>
          mangaService.updateMangaList(mangaList.id, mangaList.model).pipe(
            tap((data) => {
              (patchState(store, { 
                mangaListArray: [...store.mangaListArray(), data],
                myMangaList: [...store.myMangaList(), data],
                loading: false 
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
                console.log('Invalid Id')
                return EMPTY
            }),
            tap(() => {
              patchState(store, {
                mangaListArray: store.mangaListArray().filter(m => m.id !== listId),
                myMangaList: store.myMangaList().filter(m => m.id !== listId),
                loading: false,
              });
            }),
          );
        }),
      ),
    ),

    cleanStore() {
      patchState(store, { myMangaList: [], mangaListArray: [] });
    },
  })),

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

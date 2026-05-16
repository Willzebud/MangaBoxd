import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CommentBody, CommentResponse } from '../../models/comments-models';
import { withDevtools, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { Comments } from '../../services/comments.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

const STORAGE_SYNC_KEY = 'commentStore';

type CommentsListState = {
  commentsList: CommentResponse[];
};

const commentsListInitialState: CommentsListState = {
  commentsList: [],
};

export const CommentsListStore = signalStore(
  { providedIn: 'root' },
  withState(commentsListInitialState),
  withDevtools(STORAGE_SYNC_KEY),
  withStorageSync(STORAGE_SYNC_KEY),
  withMethods((store, commentsService = inject(Comments)) => ({
    cleanStore() {
      patchState(store, { commentsList: [] });
    },
    postComment: rxMethod<{ id: string; model: CommentBody }>(
      pipe(
        switchMap((comment) =>
          commentsService.postComment(comment.id, comment.model).pipe(
            tap((data) => {
              patchState(store, {
                commentsList: [...store.commentsList(), data],
              });
            }),
          ),
        ),
      ),
    ),

    getComments: rxMethod<string>(
      pipe(
        switchMap((listId) =>
          commentsService.getComments(listId).pipe(
            tap((data) => {
              patchState(store, {
                commentsList: data,
              });
            }),
          ),
        ),
      ),
    ),

    deleteComment: rxMethod<{ listID: string; commentId: string }>(
      pipe(
        switchMap((id) =>
          commentsService.deleteComment(id.listID, id.commentId).pipe(
            tap(() => {
              patchState(store, {
                commentsList: store.commentsList().filter((comment) => comment.id !== id.commentId),
              });
            }),
          ),
        ),
      ),
    ),
  })),
);

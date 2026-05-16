import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthModel, UserLogin, UserLoginResponse } from '../../models/auth-user-models';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../services/auth-user-service';
import { debounceTime, distinctUntilChanged, firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { withDevtools, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { Login } from '../../../login/login';


const STORAGE_SYNC_KEY = 'user';

type LoginUserState = {
  accessToken: string | null;
  user: UserLoginResponse | null;
  loading: boolean;
};

const loginInitialState: LoginUserState = {
  accessToken: null,
  user: null,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(loginInitialState),
  withDevtools(STORAGE_SYNC_KEY),
  withStorageSync(STORAGE_SYNC_KEY),

  withComputed((store) => ({
    userId: computed(() => store.user()?.id),
  })),

  withMethods((store, router = inject(Router), authService = inject(AuthUserService)) => ({
    /*async login(userLogin: UserLogin): Promise<void> {
      patchState(store, { loading: true });

      try {
        const log = await firstValueFrom(authService.loginUser(userLogin));

        patchState(store, {
          accessToken: log.accessToken,
          //username: log.user.firstname,
          user: log.user,
          loading: false,
        });

        localStorage.setItem(USER_NAME, log.user.firstname);

        router.navigate(['/homelist']);

      } catch (error) {
        patchState(store, { loading: false });
        if (error instanceof HttpErrorResponse) {
          httpError(error)
        }
      }
    },*/

    login: rxMethod<UserLogin>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((userLogin) => {
          return authService.loginUser(userLogin).pipe(
            tap((data) => {
              patchState(store, {
                  accessToken: data.accessToken,
                  user: data.user,
                  loading: false,
                });
                //localStorage.setItem(TOKEN_KEY, data.accessToken);
                router.navigate(['/homelist']);
            }),
          );
        }),
      ),
    ),

    register: rxMethod<AuthModel>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((userRegister) => {
          return authService.registerUser(userRegister).pipe(
            tapResponse({
              next: () => {
                patchState(store, {loading: false})
                router.navigate(['/login']);
              },

              error: (err) => {
                patchState(store, { loading: false });
              },
            }),
          );
        }),
      ),
    ),

    logout() {
      patchState(store, { accessToken: null, user: null, loading: false });
      router.navigate(['/login']);
    },
  })),
);

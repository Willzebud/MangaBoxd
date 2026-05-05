import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { catchError, map, Observable, single, throwError } from 'rxjs';
import { AuthUserService } from './auth-user-service';
import { AuthStore } from '../stores/auth/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  //const auth = inject(AuthUserService);
  const authStore = inject(AuthStore);
  const token = authStore.accessToken();
  const snackBar = signal(MatSnackBar);

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const newReq = req.clone({
    headers,
  });

  return next(newReq);
}

export const responseTypeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      switch (error.status) {
        case 400:
          message = 'Bad request';
          break;
        case 401:
          message = 'Incorrect email or password';
          break;
        case 404:
          message = 'Not Found';
          break;
        case 409:
          message = 'This account already exists';
          break;
        case 500:
          message = 'Server error, please try again later';
          break;
        default:
          message = 'An error has occurred';
      }

      return throwError(() => {
        alert(message);
      });
    }),
  );
};

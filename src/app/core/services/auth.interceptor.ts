import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthStore } from '../stores/auth/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authStore = inject(AuthStore);
  const token = authStore.accessToken();

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
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      switch (error.status) {
        case 201:
          message = 'Account created';
          break;
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

      snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top', 
        panelClass: 'custom-style'
      })

      return throwError(() => {
      });
    }),
  );
};

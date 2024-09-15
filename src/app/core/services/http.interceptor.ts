import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const _snackBar = inject(MatSnackBar);
  const _zone = inject(NgZone);
  const config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  return next(req).pipe(
    catchError((error) => {
      let message = 'An error occurred';

      if (error instanceof HttpErrorResponse) {
        message = error.message;
      } else {
        message = error.toString();
      }

      _zone.run(() => {
        _snackBar.open(message, 'Close', config);
      });

      return throwError(() => error);
    }),
  );
};

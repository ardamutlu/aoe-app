import { HttpErrorResponse } from '@angular/common/http';
import {
  EnvironmentProviders,
  ErrorHandler,
  NgZone,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

class ErrorHandlerService extends ErrorHandler {
  readonly #snackBar = inject(MatSnackBar);
  readonly #zone = inject(NgZone);
  #config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  override handleError(error: any): void {
    console.log('ErrorHandlerService');
    let message = 'An error occurred';
    if (error instanceof HttpErrorResponse) {
      message = error.message;
    } else {
      message = error.toString();
    }
    this.#zone.run(() => {
      this.#snackBar.open(message, 'Close', this.#config);
    });
  }
}

export function provideErrorHandler(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ]);
}

import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

/**
 * Returns a function that handles Http operation failures.
 * This error handler lets the app continue to run as if no error occurred.
 * @param form = form show message validate
 */
 export function handleErrors<T>(form: FormGroup) {
  return (error: HttpErrorResponse): Observable<T> => {
    form.setErrors({ invalid: true });
    // 400 bad request
    if (error.status === 400) {
      if (error.error)
        Object.keys(error.error).map((key) => {
          if (form.controls[key]) {
            if (!Array.isArray(error.error[key])) {
              error.error[key] = [error.error[key]];
            }

            form.controls[key].setErrors({
              messages: error.error[key],
              invalid: true,
            });
          }
        });
    }

    return throwError(error);
  };
};

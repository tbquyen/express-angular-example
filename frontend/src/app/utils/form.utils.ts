import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

/**
 * Returns a function that handles Http operation failures.
 * This error handler lets the app continue to run as if no error occurred.
 * @param form = form show message validate
 */
export function handleErrors(form: FormGroup) {
  return (error: HttpErrorResponse): Observable<never> => {
    form.setErrors({ invalid: true });

    // Xu ly loi validate( 400 bad request)
    if (error.status === 400) {
      if (error.error) {
        Object.keys(error.error).map((key) => {
          // truong hop loi item input man hinh
          if (form.controls[key]) {
            // truong hop error khong phai la mot Array thi convert lai thanh array
            if (!Array.isArray(error.error[key])) {
              error.error[key] = [error.error[key]];
            }

            // setting gia tri error vao item man hinh
            form.controls[key].setErrors({
              messages: error.error[key],
              invalid: true,
            });
          }
        });
      }
    }

    return throwError(error);
  };
};

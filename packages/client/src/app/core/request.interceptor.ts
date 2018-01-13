import { Inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { _throw } from 'rxjs/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { IS_LOGGED_IN } from './login-status.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private apiPrefix: string = '/api';

  /**
   * error handle rules
   */
  private errorHandlerRules = {
    // Unauthorized
    401: (error: HttpErrorResponse): ErrorObservable => {
      // quit app and redirect to `/login`
      this.isLoggedIn.next(false);
      this.router.navigate(['/login']);
      return _throw('You are unauthorized. Please login to continue.');
    }
  };

  constructor(
    private injector: Injector,
    private router: Router,
    @Inject(IS_LOGGED_IN) private isLoggedIn: BehaviorSubject<boolean>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url.startsWith('/') ? req.url : '/' + req.url;
    url = /^\/api\/.+/.test(url) ? url : this.apiPrefix + url;

    const options: any = { url: url };
    const newReq = req.clone(options);

    return next.handle(newReq)
      .catch(error => this.errorHandler(error));
  }

  /**
   * error handler
   * @param error
   * @returns {ErrorObservable}
   */
  private errorHandler(error: any): ErrorObservable {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      if (this.errorHandlerRules[error.status]) {
        return this.errorHandlerRules[error.status](error);
      }

      const err = error.message || JSON.stringify(error.error);
      errMsg = `${error.status} - ${error.statusText || ''} Details: ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return _throw(errMsg);
  }
}


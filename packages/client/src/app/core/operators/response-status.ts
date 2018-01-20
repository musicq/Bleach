import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export interface HttpResponseModel {
  status: number;
  data?: any;
  error?: string;
}

/**
 * handle http request response message
 * @returns {any}
 */
export function responseStatus() {
  return Observable.create((subscriber: Observer<any>) => {
    return this.subscribe(
      (response: HttpResponseModel) => {
        if (response.status === 0) {
          subscriber.next(response.data);
        } else if (response.status < 0) {
          subscriber.error(response.error);
        }
      },
      (err: any) => subscriber.error(err),
      () => subscriber.complete()
    );
  });
}

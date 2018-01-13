import { Observable } from 'rxjs/Observable';


export interface HttpResponseModel {
  status: number;
  data?: any;
  msg?: string;
}

/**
 * handle http request response message
 * @returns {any}
 */
export function responseStatus() {
  return Observable.create(subscriber => {

    return this.subscribe(
      (value: HttpResponseModel) => {
        if (value.status === 0) {
          // success
          if ('data' in value) {
            subscriber.next(value.data);
          } else {
            subscriber.next(value.msg);
          }
        } else if (value.status === 1) {
          // error
          subscriber.error(value.msg);
        }
      },
      err => subscriber.error(err),
      () => subscriber.complete()
    );

  });
}



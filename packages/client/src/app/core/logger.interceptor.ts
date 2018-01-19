import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        const time = Date.now() - started;
        console.log(`[HTTP] Request \`${req.url}\` spend ${time / 1000}s.`);
      }
    });
  }
}

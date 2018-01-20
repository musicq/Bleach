import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GraphQLService {
  constructor(private http: HttpClient) {}

  mutation(body: string) {
    return this.http
      .post<boolean>('/graphql', body)
      .responseStatus()
      .switchMap((data: any) => {
        return Observable.of(data);
      });
  }
}

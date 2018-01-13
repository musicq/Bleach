import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { IS_LOGGED_IN } from '../login-status.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


interface ILogin {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  /**
   * store last redirect url
   * @type {string}
   */
  redirectUrl: string = '/';
  /**
   * whether `GET /login` request has been sent or not.
   * @type {boolean}
   */
  private isDone: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(IS_LOGGED_IN) private isLoggedIn: BehaviorSubject<boolean>
  ) {
  }

  /**
   * get login status
   * @returns {Observable<boolean>}
   *
   * Use this api to get login status.
   * It will sent `GET /login` request first, once it has done, `isLoggedIn` variable will be set down,
   * and `GET /login` request will never send any more. The `isLoggedIn` will be available any where.
   *
   * ```
   * this.loginStatus.subscribe(status => ...);
   * ```
   */
  get loginStatus(): Observable<boolean> {
    return this.isDone ? this.isLoggedIn : this.http.get('/login', { responseType: 'text' })
      .switchMap(() => {
        this.isLoggedIn.next(true);
        return Observable.of(true);
      })
      .catch((err: string) => {
        console.error(err);
        this.isLoggedIn.next(false);
        return Observable.of(false);
      })
      .do(() => this.isDone = true);
  }

  /**
   * login
   * @param {ILogin} body
   * @returns {Observable<boolean>}
   */
  login(body: { username: string, password: string }): Observable<boolean> {
    return this.http.post<boolean>('/login', body)
      .responseStatus()
      .switchMap((data: any) => {
        this.isLoggedIn.next(true);
        this.router.navigate([this.redirectUrl]);
        return Observable.of(true);
      });
  }

  /**
   * logout
   * @returns {Observable<boolean>}
   */
  logout(): Observable<boolean> {
    return this.http.get<Observable<boolean>>('/logout')
      .responseStatus()
      .switchMap(() => {
        this.isLoggedIn.next(false);
        // when user logged out, redirect them to login page
        this.router.navigate(['/login']);
        return Observable.of(true);
      });
  }
}

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import { IS_LOGGED_IN } from '../login-status.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(IS_LOGGED_IN) private isLoggedIn: BehaviorSubject<boolean>
  ) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const url = '/' + route.path;
    return this._checkLogin(url);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this._checkLogin(url);
  }

  private _checkLogin(url: string): Observable<boolean> {
    return this.authService.loginStatus.switchMap((status: boolean) => {
      if (status) this.authService.redirectUrl = url;
      else this.router.navigate(['/login']);
      return Observable.of(status);
    }).first();
  }
}

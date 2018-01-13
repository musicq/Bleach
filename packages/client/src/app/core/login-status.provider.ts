import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export const isLoggedIn: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

export const IS_LOGGED_IN = new InjectionToken<BehaviorSubject<boolean>>('Get login status.');

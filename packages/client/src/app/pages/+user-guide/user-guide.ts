import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { IS_LOGGED_IN } from '../../core/login-status.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.html',
  styleUrls: ['./user-guide.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserGuidePage implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(IS_LOGGED_IN) public isLoggedIn: BehaviorSubject<boolean>
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(
        data => console.log('===', data),
        (err: string) => console.error(err)
      );
  }
}

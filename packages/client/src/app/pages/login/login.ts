import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IS_LOGGED_IN } from '../../core/login-status.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-login-page',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
  username: string = 'musicq';
  password: string = '111111';

  constructor(
    private authService: AuthService,
    @Inject(IS_LOGGED_IN) public isLoggedIn: BehaviorSubject<boolean>
  ) {
  }

  ngOnInit(): void {
    this.authService.loginStatus.subscribe(x => console.log(x));
  }

  login() {
    if (!this.username || !this.password) {
      alert(`username: musicq\npassword: 111111`);
      return false;
    }

    const body = {
      username: this.username,
      password: this.password
    };

    this.authService.login(body)
      .subscribe(
        data => console.log('====', data),
        (err: string) => console.error(err)
      );
  }

  logout() {
    this.authService.logout()
      .subscribe(
        data => console.log('===', data),
        (err: string) => console.error(err)
      );
  }
}

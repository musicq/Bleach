import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IS_LOGGED_IN } from '../../core/login-status.provider';
import { AuthService } from '../../core/services/auth.service';

enum Pages {
  login,
  register
}

interface Form {
  username: string;
  password: string;
  repassword?: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
  form: Form = {
    username: '',
    password: ''
  };
  repassword: string;
  actionName: string;
  isRegisterPage: boolean;
  currentPage: BehaviorSubject<Pages> = new BehaviorSubject<Pages>(Pages.login);

  constructor(private authService: AuthService, @Inject(IS_LOGGED_IN) public isLoggedIn: BehaviorSubject<boolean>) {}

  ngOnInit(): void {
    this.currentPage.subscribe(page => {
      this.isRegisterPage = page === Pages.register;
      this.actionName = this.isRegisterPage ? '注册' : '登录';
    });

    this.authService.loginStatus.subscribe(x => console.log(x ? '已经登录' : '没有登录'));
  }

  /**
   * submit form
   */
  submit(): void {
    if (!this.form.username || !this.form.password) {
      return alert(`username: musicq\npassword: 111111`);
    }

    if (this.isRegisterPage) {
      if (this.form.password !== this.repassword) return alert('两次密码输入不一致');

      this.form.repassword = this.repassword;
    }

    if (this.isRegisterPage) {
      this.authService.register(this.form).subscribe(
        data => {
          alert('注册成功');
          this.currentPage.next(Pages.login);
          this.actionName = this.isRegisterPage ? '注册' : '登录';
          console.log(data);
        },
        err => alert(err)
      );
    } else {
      this.authService.login(this.form).subscribe(data => console.log(data), err => alert(err));
    }
  }

  /**
   * switch page between 'login' and 'register'
   * @param {Event} e
   */
  switchForm(e: Event) {
    e.preventDefault();
    this.currentPage.next(this.isRegisterPage ? Pages.login : Pages.register);
    this.repassword = '';
  }
}

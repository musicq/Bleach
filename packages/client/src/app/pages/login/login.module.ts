import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoginPage,
  ],
  exports: [
    LoginPage,
  ],
  providers: [],
})
export class LoginModule {
}

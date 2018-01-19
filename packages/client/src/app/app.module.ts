import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BusinessModule } from './components';
import { CoreModule } from './core/core.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    CoreModule.forRoot(),

    AppRoutingModule,

    // 业务组件模块
    BusinessModule,

    LoginModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

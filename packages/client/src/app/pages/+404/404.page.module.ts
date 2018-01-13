import { NgModule } from '@angular/core';
import { NotFundPage } from './404.page';
import { NotFundRoutingModule } from './404-routing.page';

@NgModule({
  imports: [
    NotFundRoutingModule
  ],
  declarations: [
    NotFundPage,
  ],
  exports: [
    NotFundPage,
  ],
})
export class NotFundModule { }

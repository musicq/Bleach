import { NgModule } from '@angular/core';
import { NotFundRoutingModule } from './404-routing.page';
import { NotFundPage } from './404.page';

@NgModule({
  imports: [NotFundRoutingModule],
  declarations: [NotFundPage],
  exports: [NotFundPage]
})
export class NotFundModule {}

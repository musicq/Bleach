import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFundPage } from './404.page';

const NotFundRoutes: Routes = [
  {
    path: '',
    component: NotFundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(NotFundRoutes)]
})
export class NotFundRoutingModule {}

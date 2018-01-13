import { RouterModule, Routes } from '@angular/router';
import { NotFundPage } from './404.page';
import { NgModule } from '@angular/core';

const NotFundRoutes: Routes = [
  {
    path: '',
    component: NotFundPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(NotFundRoutes)
  ]
})
export class NotFundRoutingModule {}

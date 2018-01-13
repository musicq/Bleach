import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuidePage } from './user-guide';
import { AuthGuard } from '../../core/services/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UserGuidePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserGuideRoutingModule {
}

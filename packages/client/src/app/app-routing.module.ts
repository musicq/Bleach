import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { AuthGuard } from './core/services/auth.guard';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'user-guide',
    loadChildren: 'app/pages/+user-guide/user-guide.module#UserGuidePageModuleModule',
    canLoad: [AuthGuard]
  },
  {
    path: '404',
    loadChildren: 'app/pages/+404/404.page.module#NotFundModule'
  },
  {
    path: '',
    redirectTo: '/user-guide',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

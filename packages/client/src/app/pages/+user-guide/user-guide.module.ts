import { NgModule } from '@angular/core';
import { UserGuidePage } from './user-guide';
import { UserGuideRoutingModule } from './user-guide-routing.module';
import { SharedModule } from '../../shared/shared.module';


const COMPONENTS = [
  UserGuidePage
];

@NgModule({
  imports: [
    SharedModule,
    UserGuideRoutingModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class UserGuidePageModuleModule {
}

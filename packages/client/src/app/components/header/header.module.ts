import { NgModule } from '@angular/core';
import { HeaderComponent, MainHeaderDirective, SubHeaderDirective } from './header.component';

const COMPONENTS = [HeaderComponent, SubHeaderDirective, MainHeaderDirective];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class HeaderModule {}

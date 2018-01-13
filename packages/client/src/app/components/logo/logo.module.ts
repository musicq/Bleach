import { NgModule } from '@angular/core';
import { LogoComponent } from './logo.component';


const COMPONENTS = [
  LogoComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LogoModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusinessModule } from '../components';

const COMMON_MODULES = [BusinessModule];

@NgModule({
  imports: [...COMMON_MODULES],
  exports: [CommonModule, ...COMMON_MODULES]
})
export class SharedModule {}

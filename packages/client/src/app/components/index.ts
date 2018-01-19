import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';
import { LogoModule } from './logo/logo.module';

const MODULES: any[] = [HeaderModule, LogoModule];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [...MODULES]
})
export class BusinessModule {}

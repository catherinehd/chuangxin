import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';

import { HomeIndexComponent} from './home-index/home-index.component';

@NgModule({
  imports: [
    CommonModule, ShareModule
  ],
  declarations: [HomeIndexComponent]
})
export class HomeModule { }

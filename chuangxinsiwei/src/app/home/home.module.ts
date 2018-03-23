import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShareModule } from '../share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    ShareModule, HomeRoutingModule, BrowserModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: [

  ],
})
export class HomeModule { }

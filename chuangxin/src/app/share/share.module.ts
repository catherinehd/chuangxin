import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { PagerComponent } from './pager/pager.component';
import { PopComponent } from './pop/pop.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, PagerComponent, PopComponent],
  exports: [HeaderComponent, FooterComponent, PagerComponent, PopComponent]
})
export class ShareModule { }

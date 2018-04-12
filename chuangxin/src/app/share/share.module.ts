import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, FooterComponent, PagerComponent],
  exports: [HeaderComponent, FooterComponent, PagerComponent]
})
export class ShareModule { }

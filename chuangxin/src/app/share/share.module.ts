import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { PagerComponent } from './pager/pager.component';
import { PopComponent } from './pop/pop.component';
import { ModalComponent } from './modal/modal.component';

import { TouchLoadingDirective } from '../directives/touch-loading.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, PagerComponent, PopComponent, ModalComponent, TouchLoadingDirective, LoadingComponent],
  exports: [HeaderComponent, FooterComponent, PagerComponent, PopComponent, ModalComponent, TouchLoadingDirective, LoadingComponent]
})
export class ShareModule { }

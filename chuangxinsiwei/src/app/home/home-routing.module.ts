import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

const appRouters: Routes = [
  { path: 'home', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
})

export class HomeRoutingModule {}

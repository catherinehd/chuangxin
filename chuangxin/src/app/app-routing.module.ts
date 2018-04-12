import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientService } from './service/http-client.service';
import { AppConfigService } from './service/app-config.service';

import {HomeIndexComponent } from './home/home-index/home-index.component';

const appRouters: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeIndexComponent }
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [HttpClientService, AppConfigService],
})

export class AppRoutingModule {}

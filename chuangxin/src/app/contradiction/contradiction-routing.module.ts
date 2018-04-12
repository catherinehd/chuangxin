import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContradictionIndexComponent } from './contradiction-index/contradiction-index.component';

const appRouters: Routes = [
  { path: 'contradiction', component: ContradictionIndexComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class ContradictionRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonIndexComponent } from './person-index/person-index.component';

const appRouters: Routes = [
  { path: 'person', component: PersonIndexComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class PersonRoutingModule {}

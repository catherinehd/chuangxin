import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KnowledgeIndexComponent } from './knowledge-index/knowledge-index.component';

const appRouters: Routes = [
  { path: 'repository', component: KnowledgeIndexComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class KnowledgeRoutingModule {}

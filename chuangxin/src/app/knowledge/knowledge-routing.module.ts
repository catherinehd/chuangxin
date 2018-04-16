import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KnowledgeDescriptionComponent } from './knowledge-description/knowledge-description.component';
import {SearchResultComponent } from './search-result/search-result.component';
import { KnowledgeIndexComponent } from './knowledge-index/knowledge-index.component';

const appRouters: Routes = [
  { path: 'repository', component: KnowledgeIndexComponent,
    children: [
      {path: '', component: KnowledgeDescriptionComponent},
      {path: 'functionsearch', component: SearchResultComponent},
      {path: 'propertysearh', component: SearchResultComponent}
    ]
}

];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class KnowledgeRoutingModule {}

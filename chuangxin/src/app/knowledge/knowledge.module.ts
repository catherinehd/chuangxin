import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { ShareModule } from '../share/share.module';

import { KnowledgeIndexComponent } from './knowledge-index/knowledge-index.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { KnowledgeDescriptionComponent } from './knowledge-description/knowledge-description.component';

@NgModule({
  imports: [
    CommonModule, KnowledgeRoutingModule, ShareModule
  ],
  declarations: [KnowledgeIndexComponent, SearchResultComponent, KnowledgeDescriptionComponent]
})
export class KnowledgeModule { }

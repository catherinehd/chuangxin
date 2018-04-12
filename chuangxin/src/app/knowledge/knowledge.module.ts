import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { ShareModule } from '../share/share.module';

import { KnowledgeIndexComponent } from './knowledge-index/knowledge-index.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  imports: [
    CommonModule, KnowledgeRoutingModule, ShareModule
  ],
  declarations: [KnowledgeIndexComponent, SearchResultComponent]
})
export class KnowledgeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { ShareModule } from '../share/share.module';

import { KnowledgeService } from '../service/knowledge.service';

import { KnowledgeIndexComponent } from './knowledge-index/knowledge-index.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { KnowledgeDescriptionComponent } from './knowledge-description/knowledge-description.component';

@NgModule({
  imports: [
    CommonModule, KnowledgeRoutingModule, ShareModule, FormsModule
  ],
  providers: [ KnowledgeService ],
  declarations: [KnowledgeIndexComponent, SearchResultComponent, KnowledgeDescriptionComponent]
})
export class KnowledgeModule { }

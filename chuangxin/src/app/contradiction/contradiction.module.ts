import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContradictionService } from '../service/contradiction.service';

import { ContradictionRoutingModule } from './contradiction-routing.module';
import { ShareModule} from '../share/share.module';

import { ContradictionIndexComponent } from './contradiction-index/contradiction-index.component';
import { SearchComponent } from './search/search.component';
import { TheoryComponent } from './theory/theory.component';
import { PhysicalComponent } from './physical/physical.component';
import { ReverseComponent } from './reverse/reverse.component';
import { ParamsComponent } from './params/params.component';
import { ContradictionRightBarComponent } from './contradiction-right-bar/contradiction-right-bar.component';
import { CategoryBoxComponent } from './category-box/category-box.component';

@NgModule({
  imports: [
    CommonModule, ContradictionRoutingModule, ShareModule, FormsModule
  ],
  providers: [ ContradictionService ],
  declarations: [ContradictionIndexComponent, SearchComponent, TheoryComponent, PhysicalComponent, ReverseComponent,
    ParamsComponent, ContradictionRightBarComponent, CategoryBoxComponent]
})
export class ContradictionModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContradictionIndexComponent } from './contradiction-index/contradiction-index.component';
import { SearchComponent } from './search/search.component';
import { TheoryComponent } from './theory/theory.component';
import { PhysicalComponent } from './physical/physical.component';
import { ReverseComponent } from './reverse/reverse.component';
import { ParamsComponent } from './params/params.component';

const appRouters: Routes = [
  { path: 'contradiction', component: ContradictionIndexComponent,
    children: [
      {path: '', redirectTo: '03/search', pathMatch: 'full'},
      {path: 'classical',
        children: [
          {path: '', redirectTo: 'search', pathMatch: 'full'},
          {path: 'search', component: SearchComponent
            // children: [
            //   {path: 'detail/:searchname', component: DetailComponent}
            // ]
          },
          {path: 'theory', component: TheoryComponent},
          {path: 'physical', component: PhysicalComponent},
          {path: 'reverse', component: ReverseComponent},
          {path: 'params', component: ParamsComponent},
        ]
      },
      {path: '03',
        children: [
          {path: '', redirectTo: 'search', pathMatch: 'full'},
          {path: 'search', component: SearchComponent
            // children: [
            //   {path: 'detail/:searchname', component: DetailComponent}
            // ]
          },
          {path: 'theory', component: TheoryComponent},
          {path: 'physical', component: PhysicalComponent},
          {path: 'reverse', component: ReverseComponent},
          {path: 'params', component: ParamsComponent},
        ]
      }
    ]}
];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class ContradictionRoutingModule {}

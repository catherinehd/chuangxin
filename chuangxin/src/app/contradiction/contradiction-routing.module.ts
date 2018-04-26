import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../service/auth-guard.service';

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
          {path: 'search', component: SearchComponent, canActivate: [AuthGuard]
            // children: [
            //   {path: 'detail/:searchname', component: DetailComponent}
            // ]
          },
          {path: 'theory', component: TheoryComponent, canActivate: [AuthGuard]},
          {path: 'physical', component: PhysicalComponent, canActivate: [AuthGuard]},
          {path: 'reverse', component: ReverseComponent, canActivate: [AuthGuard]},
          {path: 'params', component: ParamsComponent, canActivate: [AuthGuard]},
        ]
      },
      {path: '03',
        children: [
          {path: '', redirectTo: 'search', pathMatch: 'full'},
          {path: 'search', component: SearchComponent, canActivate: [AuthGuard]
            // children: [
            //   {path: 'detail/:searchname', component: DetailComponent}
            // ]
          },
          {path: 'theory', component: TheoryComponent, canActivate: [AuthGuard]},
          {path: 'physical', component: PhysicalComponent, canActivate: [AuthGuard]},
          {path: 'reverse', component: ReverseComponent, canActivate: [AuthGuard]},
          {path: 'params', component: ParamsComponent, canActivate: [AuthGuard]},
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutIndexComponent } from './about-index/about-index.component';
import { AdvisorComponent } from './advisor/advisor.component';
import { CommitteeComponent } from './committee/committee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const aboutRoutes: Routes = [
  //{ path: 'about/overview', component: AboutIndexComponent },
  //{ path: 'about/committee', component: CommitteeComponent },
  //{ path: 'about/advisor', component: AdvisorComponent },
  //{ path: 'about/contactus', component: ContactUsComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule],
})

export class AboutRoutingModule {}

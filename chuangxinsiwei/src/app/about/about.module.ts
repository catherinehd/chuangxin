import  { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShareModule } from '../share/share.module';
import { AboutRoutingModule } from './about-routing.module';
import { AdvisorComponent } from './advisor/advisor.component';
import { CommitteeComponent } from './committee/committee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    ShareModule, AboutRoutingModule, BrowserModule
  ],
  declarations: [
     AdvisorComponent, CommitteeComponent, ContactUsComponent
  ],
  exports: [
     AdvisorComponent, CommitteeComponent, ContactUsComponent
  ],
  providers: [

  ],
})

export class AboutModule { }

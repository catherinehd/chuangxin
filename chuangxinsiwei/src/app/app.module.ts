import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

import { HttpClientService } from './service/http-client.service';
import { UserStoreService } from './service/user-store.service';
import { PersonService } from './service/person.service'
import { EventsService } from './service/events.service';
import { ProDevService } from './service/pro-dev.service';
import { HomeService } from './service/center.service';
import { NewsService } from './service/news.service';
import { SearchService } from './service/search.service';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { ShareModule } from './share/share.module';
import { AboutModule } from './about/about.module';

import { AppComponent } from './app.component';

import { AboutIndexComponent } from './about/about-index/about-index.component';
import { EventsIndexComponent } from './events/events-index/events-index.component';
import { ProDevIndexComponent } from './professional-dev/pro-dev-index/pro-dev-index.component';
import { SchoolComponent } from './knowledgecenter/school/school.component';
import { NewsIndexComponent } from './news/news-index/news-index.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { RegisterComponent } from './register/register/register.component';
import { PersonComponent } from './person/person.component';
import { PersonalDataComponent } from './person/personal-data/personal-data.component';
import { ModifyPasswordComponent } from './person/modify-password/modify-password.component';
import { DetailComponent } from './events/detail/detail.component';
import { SchooldetailComponent } from './knowledgecenter/schooldetail/schooldetail.component';
import { EventsWorkshopComponent } from './events/events-workshop/events-workshop.component';
import { JobComponent } from './professional-dev/job/job.component';
import { SeniorSchoolComponent } from './knowledgecenter/senior-school/senior-school.component';
import { TransferComponent } from './knowledgecenter/transfer/transfer.component';
import { RankingComponent } from './knowledgecenter/ranking/ranking.component';
import { PublicationComponent } from './news/publication/publication.component';
import { ResearchComponent } from './news/research/research.component';
import { ProDetailComponent } from './professional-dev/pro-detail/pro-detail.component';
import { DetailWorkshopComponent } from './events/detail-workshop/detail-workshop.component';
import { SeniorSchooldetailComponent } from './knowledgecenter/senior-schooldetail/senior-schooldetail.component';
import { ResetPwdComponent } from './person/reset-pwd/reset-pwd.component';
import { VerifyEmailComponent } from './person/verify-email/verify-email.component';
import { RegisterNocodeComponent } from './register/register-nocode/register-nocode.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './knowledgecenter/search/search.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';


@NgModule({
  imports: [
    BrowserModule,FormsModule, ReactiveFormsModule, HttpClientModule, HomeModule, AppRoutingModule, ShareModule, AboutModule,
  ],
  declarations: [
    AppComponent, AboutIndexComponent, EventsIndexComponent, ProDevIndexComponent, SchoolComponent, NewsIndexComponent, MembershipComponent, RegisterComponent, PersonComponent, PersonalDataComponent, ModifyPasswordComponent, DetailComponent, SchooldetailComponent, EventsWorkshopComponent, JobComponent, SeniorSchoolComponent, TransferComponent, RankingComponent, PublicationComponent, ResearchComponent, ProDetailComponent, DetailWorkshopComponent, SeniorSchooldetailComponent, ResetPwdComponent, VerifyEmailComponent, RegisterNocodeComponent, LoginComponent, SearchComponent, NewsDetailComponent,
  ],
  providers: [ HttpClientService, UserStoreService, PersonService, EventsService,ProDevService, HomeService, NewsService,SearchService, {provide: LocationStrategy,useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

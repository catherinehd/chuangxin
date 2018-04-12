import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { PersonModule } from './person/person.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { ShareModule } from './share/share.module';
import { ContradictionModule } from './contradiction/contradiction.module';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientService } from './service/http-client.service';
import { AppConfigService } from './service/app-config.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HomeModule, ShareModule, AppRoutingModule, PersonModule, KnowledgeModule, ContradictionModule
  ],
  providers: [HttpClientService, AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }

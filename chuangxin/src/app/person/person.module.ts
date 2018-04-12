import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonIndexComponent } from './person-index/person-index.component';

import { PersonRoutingModule } from './person-routing.module';
import { PersonInfoComponent } from './person-info/person-info.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
  imports: [
    CommonModule, PersonRoutingModule
  ],
  declarations: [PersonIndexComponent, PersonInfoComponent, EditPasswordComponent]
})
export class PersonModule { }

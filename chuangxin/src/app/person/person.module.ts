import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonService } from '../service/person.service';

import { PersonIndexComponent } from './person-index/person-index.component';
import { ShareModule } from '../share/share.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonInfoComponent } from './person-info/person-info.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { LoginComponent } from './login/login.component';
import { ProtocolComponent } from './protocol/protocol.component';

@NgModule({
  imports: [
    CommonModule, PersonRoutingModule, FormsModule, ReactiveFormsModule, ShareModule
  ],
  providers: [ PersonService ],
  declarations: [PersonIndexComponent, PersonInfoComponent, EditPasswordComponent, RegisterComponent, ForgetPwdComponent, LoginComponent, ProtocolComponent]
})
export class PersonModule { }

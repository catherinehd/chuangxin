import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonIndexComponent } from './person-index/person-index.component';

import { PersonRoutingModule } from './person-routing.module';
import { PersonInfoComponent } from './person-info/person-info.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule, PersonRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [PersonIndexComponent, PersonInfoComponent, EditPasswordComponent, RegisterComponent, ForgetPwdComponent, LoginComponent]
})
export class PersonModule { }

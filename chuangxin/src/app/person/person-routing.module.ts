import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth-guard.service';

import { PersonIndexComponent } from './person-index/person-index.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { LoginComponent } from './login/login.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

const appRouters: Routes = [
  { path: 'person', component: PersonIndexComponent,
    children: [
      {path: '', redirectTo: 'userinfo', pathMatch: 'full'},
      {path: 'userinfo', component: PersonInfoComponent, canActivate: [AuthGuard] },
      {path: 'editpwd', component: EditPasswordComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpwd', component: ForgetPwdComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protocol', component: ProtocolComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule],
  providers: [],
})

export class PersonRoutingModule {}

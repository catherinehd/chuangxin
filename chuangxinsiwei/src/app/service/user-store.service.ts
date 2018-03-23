import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientService } from './http-client.service';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class UserStoreService {

  user: UserModel = null;
  token: string;
  ticket: string;

  constructor(private httpClientService: HttpClientService,
              private router: Router) {
    this.token = localStorage.getItem('token') || '';
  }

  getUser(refresh?: boolean) {
    if (!this.token && refresh) this.router.navigate(['/login']);
    if (!this.token && !refresh) return Observable.of(this.user);
    if (this.token && refresh) return this.refreshUser();
    if (this.token && !refresh) {
      if (this.user) return Observable.of(this.user);
      const userStorage = localStorage.getItem('user');
      if (!userStorage) return this.refreshUser();
      this.user = JSON.parse(userStorage);
      return Observable.of(this.user);
    }
  }

  refreshUser() {
    return this.httpClientService.getMethod({
      url: 'user/getSelf'
    }).map(res => {
      if (res.success) {
        this.user = new UserModel(res.data);
        localStorage.setItem('user', JSON.stringify(this.user));
        return this.user;
      }
    });
  }

  isLogin() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  storeUser(data) {
    //this.user = new UserModel(user);
    this.token = data;
    localStorage.setItem('token', this.token);
    //localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout() {
   // localStorage.removeItem('token');
   // localStorage.removeItem('user');
   // this.user = null;
   // this.token = '';
    return this.httpClientService.getMethod({
      url: '/user/logout',
    })
  }
}

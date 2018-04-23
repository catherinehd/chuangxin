import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigateService } from './navigate.service';
import { PersonService } from './person.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private navigateService: NavigateService,
              private personService: PersonService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // localStorage.setItem('backUrl', state.url);
    this.navigateService.storeNextRoute(state.url);
    this.navigateService.push(location.pathname);
    // 可判断用户是否登录来进行路由守卫;
    if (localStorage.getItem('userInfo')) {
      return true;
    } else {
      this.navigateService.popRoute();
      return false;
    }
  }
}

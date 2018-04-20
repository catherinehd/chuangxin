import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonService } from './person.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private personService: PersonService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // localStorage.setItem('backUrl', state.url);
    // // 可判断用户是否登录来进行路由守卫;
    // if (localStorage.getItem('token') && localStorage.getItem('userInfo')){
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    this.personService.testIsLogin().subscribe( res => {
      if (res.ok) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigateService {

  routeList: {route: string, param?: any}[] = [];
  nextRoute: {route: string, param?: any} = {route: '/home'};

  constructor(private router: Router) { }

  clearRouteList() {
    this.routeList = [];
  }

  push(route?: string, param?: any) {
    const url = route || this.router.url;
    param === undefined ? this.routeList.push({route: url}) : this.routeList.push({route: route, param: param});
  }

  // 删除最后一个地址
  pop() {
    this.routeList.pop();
  }

  // 跳到最后一个地址
  popRoute() {
    if (this.routeList.length > 0) {
      const lastRoute = this.routeList.pop();
      const navParam = lastRoute.param ? [lastRoute.route, lastRoute.param] : [lastRoute.route];
      this.router.navigate(navParam);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // 跳转到页面
  pushToRoute(route: string, param?: any) {
    param ? this.router.navigate([route, param]) : this.router.navigate([route]);
  }

  pushToFragRoute(route: string, param?: any) {
    this.router.navigate([route],{ fragment: param});
  }

  // 跳转到下一个页面
  pushToNextRoute() {
    const navParam = this.nextRoute.param ? [this.nextRoute.route, this.nextRoute.param] : [this.nextRoute.route];
    this.router.navigate(navParam);
    this.nextRoute = {route: '/home'};
  }

  // 保存下一个页面
  storeNextRoute(route?: string, param?: any) {
    const url = route || this.router.url;
    this.nextRoute = param ? { route: url, param: param } : { route: url };
  }

  pushToAnotherOutlet(outlet, path) {
    this.router.navigate([{outlets: {[outlet]: [path]}}]);
  }

  closeAnotherOutlet(outlet) {
    this.router.navigate([{outlets: {[outlet]: null}}]);
  }

  getCurrUrl() {
    return this.router.url;
  }
}

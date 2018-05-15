import {Component, OnInit} from '@angular/core';
import { Router , NavigationEnd,  ActivatedRoute} from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOffline: boolean;
  title = 'app';
  inLoginStatus: string;
  popmodal = {
    title: '用户登录',
    isLoginShow: false
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe((event) => {
    //   console.log('navigatedroute:', this.activatedRoute.snapshot);
    //   });
  }

  showLogin(msg: string) {
    // 显示登录框
    if (msg === 'showLoginPop') {
      this.popmodal.isLoginShow = true;
    }
  }

  closePop() {
    // 关闭模态框
    this.popmodal.isLoginShow = false;

  }

  // 登录框改变登录状态，'1'为已经登录
  loginStatus(msg) {
    this.inLoginStatus = msg;
  }
}

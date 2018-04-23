import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isOffline: boolean;
  title = 'app';
  inLoginStatus: string;

  popmodal = {
    title: '用户登录',
    isLoginShow: false
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

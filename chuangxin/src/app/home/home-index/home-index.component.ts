import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

declare var $: any;

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.styl']
})
export class HomeIndexComponent implements OnInit {

  setActive: number; // 1.2.3
  popmodal = {
    title: '用户登录',
    isLoginShow: false
  }

  constructor(private navigateServeice: NavigateService) {
    this.setActive = 2;
  }

  ngOnInit() {
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

  gopage(url) {
    if (url === './repository/functionsearch') {
      if (localStorage.getItem('userInfo')) {
        this.navigateServeice.pushToRoute(url);
      } else {
        this.popmodal.isLoginShow = true;
      }
    }
    this.navigateServeice.pushToRoute(url);
  }

  closePop() {
    // 关闭模态框
    this.popmodal.isLoginShow = false;

  }
}

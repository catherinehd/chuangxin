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
    if (localStorage.getItem('userInfo') && localStorage.getItem('cxtoken')) {
      if (url.indexOf('contradiction') !== -1) {
        $('#contradiction').addClass('active');
      } else {
        $('#repository').addClass('active');
      }
      this.navigateServeice.pushToRoute(url);
    }
    this.navigateServeice.storeNextRoute(url);
    this.popmodal.isLoginShow = true;
  }

  closePop() {
    // 关闭模态框
    this.popmodal.isLoginShow = false;

  }
}

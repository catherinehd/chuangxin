import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { NavigateService } from '../../service/navigate.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  @Output() showLoginPop = new EventEmitter();
  contradictionShow: boolean; // 显示矛盾矩阵下拉菜单
  repositoryShow: boolean; // 显示知识库下拉菜单
  inlogin: boolean; // 已经登录为true
  showToggle: boolean; // 显示个人中心的下拉框
  msg: string; // 弹窗内容
  userName: string; // 用户名
  contradictionActive: boolean;
  repositoryActive: boolean;

  constructor(private personService: PersonService,
              private navigateService: NavigateService) {
    this.inlogin = false;
    this.contradictionShow = false;
    this.repositoryShow = false;
    this.contradictionActive = false;
    this.repositoryActive = false;
    this.showToggle = false;
    this.msg = '';
    this.userName = '';
  }

  ngOnInit() {
    if (localStorage.getItem('cxtoken')) {
      this.personService.testIsLogin(localStorage.getItem('cxtoken')).subscribe(res => {
        if (res.ok) {
          this.inlogin = true;
          this.userName = JSON.parse(res.data).userName;
        } else {
          this.inlogin = false;
          localStorage.removeItem('cxtoken');
          localStorage.removeItem('userInfo');
        }
      });
    } else {
      this.inlogin = false;
    }
    if (location.hash.indexOf('/contradiction') !== -1) {
      this.contradictionActive = true;
      this.repositoryActive = false;
      $('#contradiction').addClass('active');
    } else if (location.hash.indexOf('/repository') !== -1) {
      this.contradictionActive = false;
      this.repositoryActive = true;
      $('#repository').addClass('active');
    }
  }

  isLoginShow() {
    // 传显示登录框的值给父组件
    this.showLoginPop.emit('showLoginPop');
  }

  // 退出登录
  logout() {
    this.personService.logOut().subscribe( res => {
      if (res.ok) {
        this.inlogin = false;
        this.setActive();
        this.navigateService.clearRouteList();
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cxtoken');
        this.msg = '退出成功';
        setTimeout( () => {
          this.msg = '';
          location.reload();
          this.navigateService.pushToRoute('/home');
        }, 2000);
      }
    });
  }

  // 没有登录的时候显示登录框
  isShowLoginPop(url) {
    if (url === '/home') {
      this.contradictionActive = false;
      this.repositoryActive = false;
    }
    // 如果已经登录
    if (localStorage.getItem('userInfo') && localStorage.getItem('cxtoken')) {
      if (url.indexOf('contradiction') !== -1) {
        this.contradictionActive = true;
        this.repositoryActive = false;
        $('#contradiction').addClass('active');
        $('#repository').removeClass('active');
      } else if (url.indexOf('repository') !== -1) {
        this.contradictionActive = false;
        this.repositoryActive = true;
        $('#repository').addClass('active');
        $('#contradiction').removeClass('active');
      } else {
        $('#repository').removeClass('active');
        $('#contradiction').removeClass('active');
        return;
      }
      return;
    } else {
      // 没有登录
      if (url !== '/home') {
        this.navigateService.storeNextRoute(url);
        this.isLoginShow();
      }
    }
  }

  // 跳转页面
  goPage(url) {
  }

  setActive() {
    $('#repository').removeClass('active');
    $('#contradiction').removeClass('active');
  }
}

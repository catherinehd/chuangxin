import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { NavigateService } from '../../service/navigate.service';

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

  constructor(private personService: PersonService,
              private navigateService: NavigateService) {
    this.inlogin = false;
    this.contradictionShow = false;
    this.repositoryShow = false;
    this.showToggle = false;
    this.msg = '';
  }

  ngOnInit() {
    this.personService.testIsLogin().subscribe(res => {
      if (res.ok) {
        this.inlogin = true;
      }
    });
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
        this.msg = '退出成功';
        setTimeout( () => {
          this.msg = '';
        }, 3000);
      }
    });
  }

  gopage(url) {
    this.navigateService.pushToRoute(url);
  }
}

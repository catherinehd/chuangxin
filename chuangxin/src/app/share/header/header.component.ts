import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() {
    this.inlogin = false;
    this.contradictionShow = false;
    this.repositoryShow = false;
  }

  ngOnInit() {
  }

  isLoginShow() {
    // 传显示登录框的值给父组件
    this.showLoginPop.emit('showLoginPop');
  }
}

import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-contradiction-right-bar',
  templateUrl: './contradiction-right-bar.component.html',
  styleUrls: ['./contradiction-right-bar.component.styl']
})
export class ContradictionRightBarComponent implements OnInit {

  type: string; // 经典版还是03版
  localUrl: string; // 当前地址

  constructor() {
    window.onscroll = function () {
      const i = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
      $('.bar-box').css('top', 418 - i );
      if (i >= 418) {
        $('.bar-box').css('top', 0 );
      }
    };
  }

  ngOnInit() {
    this.localUrl = location.hash;
    if (this.localUrl.indexOf('classical') !== -1) {
      this.type = 'classical';
    } else {
      this.type = '03';
    }
  }

  toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

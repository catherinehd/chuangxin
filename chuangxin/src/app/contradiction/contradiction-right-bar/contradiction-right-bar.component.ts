import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contradiction-right-bar',
  templateUrl: './contradiction-right-bar.component.html',
  styleUrls: ['./contradiction-right-bar.component.styl']
})
export class ContradictionRightBarComponent implements OnInit {

  type: string; // 经典版还是03版
  localUrl: string; // 当前地址

  constructor() { }

  ngOnInit() {
    this.localUrl = location.pathname;
    if (this.localUrl.indexOf('classical') !== -1) {
      this.type = 'classical';
    } else {
      this.type = '03';
    }
  }

}

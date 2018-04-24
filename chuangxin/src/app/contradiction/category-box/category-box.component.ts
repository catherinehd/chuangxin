import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.styl']
})
export class CategoryBoxComponent implements OnInit {

  @Input() resultList: object[];
  @Input() defaultName: string;
  @Output() chooseName = new EventEmitter<string>();
  @Output() chooseReverseName = new EventEmitter<string>();
  @Output() getMore = new EventEmitter();

  activeName: string; // 被选中的内容标题

  constructor() {
  }

  ngOnInit() {
  }

  // 默认选中第一个标题，通过数组排列选中
  choosename(name, id, principleId, num) {
    this.activeName = name;
    this.chooseName.emit(num);
  }

  // 反查矛盾中默认选中的标题，通过principleId来选
  choosereversename(name, id, principleId) {
    this.activeName = name;
    this.chooseReverseName.emit(principleId);
  }

  // 获取更多
  getmore() {
    document.getElementById('scrollbox').scrollLeft += 870;
    this.getMore.emit();
  }
}


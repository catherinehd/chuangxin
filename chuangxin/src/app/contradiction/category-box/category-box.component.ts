import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.styl']
})
export class CategoryBoxComponent implements OnInit, OnChanges {

  @Input() resultList: any;
  @Input() nomore: boolean;
  @Input() defaultName: string;
  @Output() chooseName = new EventEmitter<string>();
  @Output() chooseReverseName = new EventEmitter<string>();
  @Output() getMore = new EventEmitter();

  activeName: string; // 被选中的内容标题
  timer: any;
  leftbtn: boolean; // 左边按钮是否显示
  rightbtn: boolean; // 右边按钮是否显示

  constructor() {
  }

  ngOnInit() {
    if (this.resultList.length) {
      this.activeName = this.resultList[0].name;
    } else {
      setTimeout( () => {
        this.activeName = this.resultList[0].name;
      }, 1000);
    }
    this.leftbtn = false;
    this.rightbtn = true;
  }

  ngOnChanges(changes) {
    if (changes.resultList.currentValue !== changes.resultList.previousValue) {
      if (this.resultList.length) {
        this.activeName = this.resultList[0].name;
      } else {
        setTimeout( () => {
          if (this.resultList.length) {
            this.activeName = this.resultList[0].name;
          }
        }, 1000);
      }
    }
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
  getmore(msg) {
    // console.log(this.nomore);
    // if ( this.nomore ) {
    //   this.rightbtn = false;
    // }
    if (msg === 'right') {
      document.getElementById('scrollbox').scrollLeft += 670;
      this.leftbtn = true;
      $('#second-top-nav').css('padding-left', '110px');
      this.getMore.emit();
    } else if (msg === 'left') {
      if (document.getElementById('scrollbox').scrollLeft === 0) {
        this.leftbtn = false;
        $('#second-top-nav').css('padding-left', '12px');
        return;
      } else {
        document.getElementById('scrollbox').scrollLeft -= 670;
        this.rightbtn = true;
      }
    } else {
      return;
    }
    // console.log(document.getElementById('scrollbox').scrollLeft);
  }
}

class ResultList {
  constructor(
    name: string,
    id: string,
    principleId: string,
    principleNum: string
  ) {}
}

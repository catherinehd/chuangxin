import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.styl']
})
export class CategoryBoxComponent implements OnInit, OnChanges {

  @Input() resultList: any;
  @Input() defaultName: string;
  @Output() chooseName = new EventEmitter<string>();
  @Output() chooseReverseName = new EventEmitter<string>();
  @Output() getMore = new EventEmitter();

  activeName: string; // 被选中的内容标题
  leftbtn: boolean; // 左边按钮是否显示
  rightbtn: boolean; // 右边按钮是否显示

  lastName: string; // 最后一个标题

  constructor() {
    this.lastName = '';
    this.rightbtn = true;
    this.leftbtn = false;
  }

  ngOnInit() {
    if (this.resultList.length) {
      this.activeName = this.resultList[0].name;
    } else {
      setTimeout( () => {
        this.activeName = this.resultList[0].name;
      }, 1000);
    }
  }

  ngOnChanges(changes) {
    if (changes.resultList.currentValue && changes.resultList.previousValue) {
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
    if (msg === 'right') {
      document.getElementById('scrollbox').scrollLeft += 670;
      this.leftbtn = true;
      $('#second-top-nav').css('padding-left', '110px');
      this.getMore.emit();
      // if (this.lastName === $('#second-top-nav').find('li:last-child')[0].innerText) {
      //   let w = 0;
      //   for (let i = 0 ; i < this.resultList.length; i++) {
      //     w += $('#second-top-nav').find('li')[i].clientWidth;
      //   }
      //   $('#nameList-box').width(w);
      // } else {
      //   this.lastName = $('#second-top-nav').find('li:last-child')[0].innerText;
      // }
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

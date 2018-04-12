import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.styl']
})
export class PagerComponent implements OnInit {

  @Input() pageCount: number;    //一共多少页
  @Input() currPage: number;     //当前多少页
  @Output() showPage = new EventEmitter<number>();

  noLists: boolean;
  pageList: number[] = [];
  showPageList: number[] = [];
  showPageCount: number = 10;    //默认的显示页数，如果总页数小于10全部显示


  constructor(){
  }

  ngOnInit() {
    if(this.pageCount === 0) {
      this.noLists = true;
    }
  }

  ngOnChanges(changes){
    if (changes && changes.pageCount && changes.pageCount.currentValue){
      if (!this.pageList[0]) this.initPageList();
      this.changePagination();
    }
  }

  initPageList(){
    for (let i=2; i < this.pageCount; i++){
      this.pageList.push(i);
    }
  }


  goPage(page){
    if (page === this.currPage) return;
    this.currPage = page;
    this.showPage.emit(page);
    this.changePagination();
  }

  changePagination(){
    if (this.pageCount <= this.showPageCount){
      if (this.showPageList[0]) return;
      this.showPageList = this.pageList;
    }else{
      if (this.currPage < 5){
        this.showPageList = this.pageList.slice(0, 6);
      }else if (this.currPage >= this.pageCount - 3){
        this.showPageList = this.pageList.slice(-6);
      }else{
        this.showPageList = this.pageList.slice(this.currPage - 4, this.currPage + 1);
      }
    }
  }

  goPrePage(){
    this.currPage --;
    this.showPage.emit(this.currPage);
    this.changePagination();
  }

  goNextPage(){
    this.currPage ++;
    this.showPage.emit(this.currPage);
    this.changePagination();
  }

}

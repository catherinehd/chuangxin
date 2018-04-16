import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.styl']
})
export class SearchResultComponent implements OnInit {

  hasResearch: boolean; // 有进行搜索为true。默认为false。
  hasResult: boolean; //搜索有结果为true
  constructor() {
    this.hasResearch = false;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ContradictionService } from '../../service/contradiction.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl' , '../../knowledge/search-result/search-result.component.styl' ]
})
export class SearchComponent implements OnInit {

  hasResearch: boolean; // 有进行搜索为true。默认为false。
  hasResult: boolean; // 搜索有结果为true
  localUrl: string; // 当前地址
  page: number; // 查询的页数
  resultList: object[]; // 查询结果列表

  positive: string[]; // 改善特性列表
  nagative: string[]; // 恶化特性列表
  posit: string; // 选择的改善特性
  nagat: string; // 选择的恶化特性
  searchPosit: string; // 检索的改善
  searchNagat: string; // 检索的恶化
  state: string; // 经典版为0 ， 03版为1

  resultNameList: string[]; // 搜索结果标题列表

  constructor(private contradictionService: ContradictionService) {
    this.hasResearch = false;
    this.page = 1;
    this.resultNameList = [];
  }

  ngOnInit() {
    this.localUrl = location.pathname;
    if (this.localUrl.indexOf('classical/seach') !== -1) {
      // 经典
      this.contradictionService.getClassicalList().subscribe( res => {
        if (res.msg) {
          this.positive = res.data;
          this.nagative = res.data;
        }
      });
    } else {
      // 03版本
      this.contradictionService.getThirdList().subscribe( res => {
        if (res.msg) {
          this.positive = res.data;
          this.positive.unshift('选择全部');
          this.nagative = this.positive;
        }
      });
    }
    this.posit = '选择全部';
    this.nagat = '选择全部';
  }

  getSearchRult() {
    // 进行检索
    this.hasResearch = true;
    this.hasResult = true;
    if (this.posit === '选择全部') {
      this.searchPosit = '';
    } else {
      this.searchPosit = this.posit;
    }
    if (this.nagat === '选择全部') {
      this.searchNagat = '';
    } else {
      this.searchNagat = this.nagat;
    }
    if (this.localUrl.indexOf('classical/search') !== -1) {
      // 经典
      this.state = '0';
    } else {
      // 03版
      this.state = '1';
    }
    this.contradictionService.getRearchList(this.searchPosit, this.searchNagat, this.state, this.page).subscribe( res => {
      if (res.msg && res.rows.length) {
        this.resultList = res.rows;
      } else {
        this.hasResult = false;
      }
    });
  }
}

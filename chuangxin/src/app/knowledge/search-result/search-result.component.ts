import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../../service/knowledge.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.styl']
})
export class SearchResultComponent implements OnInit {

  hasResearch: boolean; // 有进行搜索为true。默认为false。
  hasResult: boolean; // 搜索有结果为true
  funcs: string[]; // 实现功能选项列表
  funs: string[]; // 对象性状选项列表
  func: string; // 选择的要实现功能
  fun: string; // 选择的对象性状
  searchFunc: string; // 检索的功能
  searchFun: string; // 检索的性状
  localUrl: string; // 当前地址
  page: any = {pageIndex: 1, pageCount: 1};  // 获取当前页和总页数
  resultList: string[]; // 查询结果列表

  constructor( private knowledgeService: KnowledgeService) {
    this.hasResearch = false;
  }

  ngOnInit() {
    this.localUrl = location.pathname;
    if (this.localUrl.indexOf('functionsearch') !== -1) {
      // 功能检索
      this.getFuncSearchFuncList();
      this.funs = ['全部领域', '改变', '稳定', '减少', '增加', '测量'];
    } else {
      // 属性检索
      this.getPropertySearchFuncList();
      this.funs = ['全部领域', '粉末', '场', '气体', '液体', '固体'];
    }
    this.fun = this.funs[0];
  }

  // 获取功能检索的功能列表
  getFuncSearchFuncList() {
    this.knowledgeService.getFuncList().subscribe( res => {
      if (res.msg) {
        this.funcs = res.rows;
        this.funcs.unshift('全部功能');
        this.func = this.funcs[0];
      }
    });
  }

  // 获取属性检索的功能列表
  getPropertySearchFuncList() {
    this.knowledgeService.getPropertySearchFuncList().subscribe( res => {
      if (res.msg) {
        this.funcs = res.rows;
        this.funcs.unshift('全部功能');
        this.func = this.funcs[0];
      }
    });
  }

  getSearchRult() {
    // 进行检索
    this.hasResearch = true;
    this.hasResult = true;
    if (this.func === '全部功能') {
      this.searchFunc = '';
    } else {
      this.searchFunc = this.func;
    }
    if (this.fun === '全部领域') {
      this.searchFun = '';
    } else {
      this.searchFun = this.fun;
    }
    if (this.localUrl.indexOf('functionsearch') !== -1) {
      // 功能检索
      this.knowledgeService.getknowledgeRearchList(this.searchFunc,  this.searchFun, '', '', this.page.pageIndex).subscribe(res => {
        if (res.msg && res.rows.length) {
          this.resultList = res.rows;
          this.page.pageCount = Math.floor(res.total / 10) + 1 ;
        } else {
          this.hasResult = false;
        }
      });
    } else {
      // 属性检索
      this.knowledgeService.getknowledgeRearchList('', '', this.searchFunc,  this.searchFun, this.page.pageIndex).subscribe(res => {
        if (res.msg && res.rows.length) {
          this.resultList = res.rows;
          this.page.pageCount = Math.floor(res.total / 10) + 1;
        } else {
          this.hasResult = false;
        }
      });
    }
  }

  onShowPage(page) {
    this.page.pageIndex = page;

    this.getSearchRult();

  }
}

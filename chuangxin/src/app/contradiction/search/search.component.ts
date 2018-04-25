import { Component, OnInit } from '@angular/core';
import { ContradictionService } from '../../service/contradiction.service';
import { NavigateService } from '../../service/navigate.service';

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
  resultList: any[]; // 查询结果列表
  defaultId: number; // 默认查看的标题id
  defaultName: string; // 默认查看的标题id

  positive: string[]; // 改善特性列表
  nagative: string[]; // 恶化特性列表
  posit: string; // 选择的改善特性
  nagat: string; // 选择的恶化特性
  searchPosit: string; // 检索的改善
  searchNagat: string; // 检索的恶化
  state: string; // 经典版为0 ， 03版为1

  resultNameList: object[]; // 搜索结果标题列表
  resultDetail: string;  // 结果详情

  allLoad: boolean;  // 已经获取了全部数据时候为true
  isLoading: boolean;

  constructor(private contradictionService: ContradictionService,
              private navigateService: NavigateService) {
    this.hasResearch = false;
    this.page = 1;
    this.resultList = [];
    this.resultNameList = [];
    this.isLoading =  false;
    this.defaultId = 0;
  }

  ngOnInit() {
    this.localUrl = location.hash;
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
    this.isLoading = true;
    this.contradictionService.getRearchList(this.searchPosit, this.searchNagat, this.state, this.page).subscribe( res => {
      if (res.msg === 'ok' && res.rows.length) {
        this.isLoading = false;
        this.resultList = this.resultList.concat(res.rows);
        if (this.page === (res.total / 10)) {
          this.allLoad = true;
        } else {
          this.allLoad = false;
        }
        for (let i = 0; i < res.rows.length; i++) {
          let name = res.rows[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.rows[i].principleNum, principleId: res.rows[i].principleId});
        }
        // this.defaultName = this.resultNameList[0];
        document.getElementsByClassName('contraction-result-detail-info')[0].innerHTML = this.resultList[this.defaultId].principleContent;
      } else {
        this.hasResult = false;
        this.isLoading = false;
      }
    });
  }

  // 切换标题
  chooseName(id) {
    this.defaultId = id;
    document.getElementsByClassName('contraction-result-detail-info')[0].innerHTML = this.resultList[id].principleContent;
  }

  // 获取更多的数据
  getmore() {
    if (!this.allLoad) {
      this.page++;
      this.getSearchRult();
    } else {
      return;
    }
  }

  // 点击冲突检索进行检索
  btnSearch() {
    // 进行检索
    this.page = 1;
    this.resultList = [];
    this.resultNameList = [];
    this.defaultId = 0;
    this.getSearchRult();
  }
}


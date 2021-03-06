import { Component, OnInit } from '@angular/core';
import { ContradictionService } from '../../service/contradiction.service';

@Component({
  selector: 'app-reverse',
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.styl']
})
export class ReverseComponent implements OnInit {

  resultNameList: object[]; // 搜索结果标题列表
  resultList: any[]; // 查询结果列表
  page: number;   // 原理名称页码
  page2: number; // 反原理的列表数据页码
  allLoad: boolean;  // 已经获取了全部数据时候为true
  allLoad2: boolean;  //  获取具体标题下全部数据时候为true;

  reverseResult: any[]; // 反查结果
  state: number; // 0-经典版 1-03版
  showId: number ; // 目前查看的标题的id
  isLoading: boolean;
  isLoading2: boolean; // 矛盾列表

  constructor(private contradictionService: ContradictionService) {
    this.page = 1;
    this.page2 = 1;
    this.resultList = [];
    this.resultNameList = [];
    this.reverseResult = [];
    this.allLoad = false;
    this.isLoading =  false;
    this.isLoading2 =  false;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (location.hash.indexOf('contradiction/03') !== -1) {
      this.state = 1;
    } else {
      this.state = 0;
    }
    this.getNameList();
  }

  // 获取名称列表和第一个标题的内容
  getNameList() {
    this.isLoading =  true;
    this.contradictionService.getTheory(this.page).subscribe(res => {
      if (res.msg === 'ok' && res.rows.length) {
        this.isLoading =  false;
        this.resultList = this.resultList.concat(res.rows);
        if (this.page === res.total) {
          this.allLoad = true;
        } else {
          this.allLoad = false;
        }
        for (let i = 0; i < res.rows.length; i++) {
          let name = res.rows[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.rows[i].principleNum, principleId: res.rows[i].principleId});
        }
        this.showId = res.rows[0].principleId;
        this.getReverse(res.rows[0].principleId, this.state);
      } else {
        // 没有获取到结果
        this.isLoading =  false;
      }
    });
  }

  // 只获取名称列表
  getNameListOnly() {
    this.contradictionService.getTheory(this.page).subscribe(res => {
      if (res.msg === 'ok' && res.rows.length) {
        this.resultList = this.resultList.concat(res.rows);
        if (this.page === res.total) {
          this.allLoad = true;
        } else {
          this.allLoad = false;
        }
        for (let i = 0; i < res.rows.length; i++) {
          let name = res.rows[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.rows[i].principleNum, principleId: res.rows[i].principleId});
        }
      } else {
        // 没有获取到结果
      }
    });
  }

  // 获取名称对应矛盾
  getReverse(id, state) {
    this.isLoading2 =  true;
    this.contradictionService.getReverse(id, state, this.page2).subscribe(res => {
      if (res.msg === 'ok' && res.rows.length) {
        this.isLoading2 =  false;
        this.reverseResult = this.reverseResult.concat(res.rows);
        if (this.page2 === res.total) {
          this.allLoad2 = true;
        } else {
          this.allLoad2 = false;
        }
      } else {
        this.isLoading2 =  false;
        // 没有内容
      }
    });
  }

  // 切换标题
  choosereversename(id) {
    this.isLoading2 =  true;
    this.reverseResult = [];
    this.contradictionService.getReverse(id, this.state, 1).subscribe(res => {
      this.reverseResult = res.rows;
      this.page2 = 1;
      this.showId = id;
      this.isLoading2 =  false;
      document.getElementsByClassName('reverse-theory-box')[0].scrollTop = 0;
    });
  }

  // 获取更多的数据,获取的是名称列表
  getmore() {
    if (!this.allLoad) {
      this.page++;
      this.getNameListOnly();
    } else {
      return;
    }
  }

  // 滚动页面获取该标题下的更多数据
  getMoreList() {
    if (!this.allLoad2) {
      this.page2++;
      this.getReverse(this.showId, this.state);
    } else {
      return;
    }
  }

}

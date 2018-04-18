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
  page: number;

  reverseResult: any[]; // 反查结果
  state: number; // 0-经典版 1-03版

  constructor(private contradictionService: ContradictionService) {
    this.page = 1;
    this.resultNameList = [];
  }

  ngOnInit() {
    if (location.pathname.indexOf('contradiction/03')) {
      this.state = 1;
    } else {
      this.state = 0;
    }
    this.getNameList();
  }

  // 获取名称列表
  getNameList() {
    this.contradictionService.getTheory(this.page).subscribe(res => {
      if (res.msg && res.rows.length) {
        this.resultList = res.rows;
        this.resultNameList = [];
        for (let i = 0; i < this.resultList.length; i++) {
          let name = res.rows[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.rows[i].principleNum, principleId: res.rows[i].principleId});
        }
        this.getReverse(res.rows[0].principleId, this.state);
      } else {
        // 没有获取到结果
      }
    });
  }

  // 获取名称对应矛盾
  getReverse(id, state) {
    this.contradictionService.getReverse(id, state, this.page).subscribe(res => {
      if (res.msg && res.rows.length) {
        this.reverseResult = res.rows;
      } else {
        // 没有内容
      }
    });
  }

  // 切换标题
  choosereversename(id) {
    this.contradictionService.getReverse(id, this.state, this.page).subscribe(res => {
      this.reverseResult = res.rows;
    });
  }
}

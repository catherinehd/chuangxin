import { Component, OnInit } from '@angular/core';
import { ContradictionService } from '../../service/contradiction.service';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.styl']
})
export class TheoryComponent implements OnInit {

  resultNameList: object[]; // 搜索结果标题列表
  resultList: any[]; // 查询结果列表
  page: number;
  allLoad: boolean;  // 已经获取了全部数据时候为true

  constructor(private contradictionService: ContradictionService) {
    this.page = 1;
    this.resultList = [];
    this.resultNameList = [];
    this.allLoad = false;
  }

  ngOnInit() {
    this.getTheory();
  }

  // 获取矛盾原理
  getTheory() {
    this.contradictionService.getTheory(this.page).subscribe(res => {
      if (res.msg && res.rows.length) {
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
        document.getElementsByClassName('case')[0].innerHTML = this.resultList[0].principleContent;
      } else {
        // 没有原理
      }
    });
  }

  // 切换标题
  chooseName(num) {
    document.getElementsByClassName('case')[0].innerHTML = this.resultList[num].principleContent;
  }

  // 获取更多的数据
  getmore() {
    if (!this.allLoad) {
      this.page++;
      this.getTheory();
    } else {
      return;
    }
  }
}

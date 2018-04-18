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

  constructor(private contradictionService: ContradictionService) {
    this.page = 1;
    this.resultNameList = [];
  }

  ngOnInit() {
    this.getTheory();
  }

  // 获取矛盾原理
  getTheory() {
    this.contradictionService.getTheory(this.page).subscribe(res => {
      if (res.msg && res.rows.length) {
        this.resultList = res.rows;
        this.resultNameList = [];
        for (let i = 0; i < this.resultList.length; i++) {
          let name = res.rows[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.rows[i].principleNum});
        }
        document.getElementsByClassName('case')[0].innerHTML = res.rows[0].principleContent;
      } else {
        // 没有原理
      }
    });
  }

  // 切换标题
  chooseName(id) {
    document.getElementsByClassName('case')[0].innerHTML = this.resultList[id].principleContent;
  }

}

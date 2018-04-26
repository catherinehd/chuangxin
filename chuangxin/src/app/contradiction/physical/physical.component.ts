import { Component, OnInit } from '@angular/core';
import { ContradictionService } from '../../service/contradiction.service';

@Component({
  selector: 'app-physical',
  templateUrl: './physical.component.html',
  styleUrls: ['./physical.component.styl' , '../theory/theory.component.styl']
})
export class PhysicalComponent implements OnInit {

  type: number; // 空间分离-1， 时间分离-2， 条件分离-3， 系统分离-4
  state: string; // 分离的类别，1-空间分离  2-时间分离 3-系统级别分离，转换到子系统 4-系统级别分离，转换到超系统  5-系统级别分离，转换到竞争性系统 6-系统级别分离，转换到相反系统  7-条件分离
  resultNameList: object[]; // 搜索结果标题列表
  resultList: any[]; // 查询结果列表
  toggleShow: boolean; // toggle显示为true;
  allLoad: boolean;  // 已经获取了全部数据时候为true
  isLoading: boolean;

  constructor(private contradictionService: ContradictionService) {
    this.type = 1;
    this.state = '1';
    this.resultNameList = [];
    this.toggleShow = false;
    this.isLoading =  false;
  }

  ngOnInit() {
    this.getPhysicalResult();
  }

  // 选择分离方式
  choosePart(type , state) {
    this.type = type;
    this.state = state;
    this.getPhysicalResult();
  }

  // 获取对应分离下的物理矛盾
  getPhysicalResult() {
    this.isLoading =  true;
    this.contradictionService.getPhysical(this.state).subscribe( res => {
      if (res.msg === 'OK' && res.data.length) {
        this.isLoading =  false;
        this.resultList = res.data;
        this.resultNameList = [];
        for (let i = 0; i < this.resultList.length; i++) {
          let name = res.data[i].principleName;
          name = name.replace(/（[^）]+）/g, '');
          this.resultNameList.push({id: i, name: name, principleNum: res.data[i].principleNum});
        }
        document.getElementsByClassName('case')[0].innerHTML = this.resultList[0].principleContent;
      } else {
        this.isLoading =  false;
        // 没有原理
      }
    });
  }

  // 切换标题
  chooseName(id) {
    document.getElementsByClassName('case')[0].innerHTML = this.resultList[id].principleContent;
  }

  // 获取更多的数据
  getmore() {
  }
}

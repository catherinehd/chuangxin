import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable()
export class ContradictionService {

  constructor(private httpClientService: HttpClientService) { }

  // 获取经典搜索条件列表
  getClassicalList() {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrincipleCollection',
    });
  }

  // 获取03版搜索条件列表
  getThirdList() {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrincipleCol',
    });
  }

  // 搜索结果
  getRearchList(func, funs, state, page) {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrincipleList/' + page,
      data: {
        fun: func,
        funs: funs,
        state: state
      }
    });
  }

  // 矛盾原理
  getTheory(page) {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrincipleListAll/' + page,
    });
  }

  // 原理反查矛盾
  getReverse(id, state, page) {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrinciplecolById/' + page,
      data: {
        id: id,
        state: state
      }
    });
  }

  // 物理矛盾
  getPhysical( state ) {
    return this.httpClientService.getMethod({
      url: 'principle/queryPrincipleByNexus/',
      data: {
        state: state
      }
    });
  }

}

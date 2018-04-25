import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable()
export class KnowledgeService {

  constructor(private httpClientService: HttpClientService) { }

  // 获取功能检索的功能搜索列表
  getFuncList() {
    return this.httpClientService.getMethod({
      url: 'effect/queryeffectFunction',
    });
  }

  // 获取属性检索的功能搜索列表
  getPropertySearchFuncList() {
    return this.httpClientService.getMethod({
      url: 'effect/queryeffectAttribute',
    });
  }

  // 搜索结果
  getknowledgeRearchList(func, status, func2, status2, page) {
    return this.httpClientService.postMethod({
      url: 'effect/queryEffectList/' + page,
      data: {
        fun: func,
        funs: status,
        att: func2,
        atts: status2
      }
    });
  }

}

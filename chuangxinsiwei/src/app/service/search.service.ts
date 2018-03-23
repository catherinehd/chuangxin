import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service'

@Injectable()
export class SearchService {

  constructor(private httpclientService: HttpClientService) { }

  search(page, fun, funs, att, atts) {
    return this.httpclientService.getMethod({
      url: '/effect/queryEffectList/' + page,
      data: {
        fun: fun,
        funs: funs,
        att: att,
        atts: atts
      }
    })
  }

  singleSearch(id) {
    return this.httpclientService.getMethod({
      url: '/effect/queryeffectById',
      data: {
        id: id
      }
    })
  }

  conflictSearch(page, fun, funs, state) {
    return this.httpclientService.getMethod({
      url: '/principle/queryPrincipleList' + page,
      data: {
        fun: fun,
        funs: funs,
        state: state
      }
    })
  }

  singleTheory(page) {
    return this.httpclientService.getMethod({
      url: '/principle/queryPrincipleListAll/' + page
    })
  }

  conflictReverse(page, id, state) {
    return this.httpclientService.getMethod({
      url: '/principle/queryPrinciplecolById/' + page,
      data: {
        id: id,
        state: state
      }
    })
  }

  // 和前面的单条查询有什么区别？
  singleSearchConflict() {
    return this.httpclientService.getMethod({
      url: '/principle/queryPrincipleById'
    })
  }

  phsicConflict(state) {
    return this.httpclientService.getMethod({
      url: '/principle/queryPrincipleByNexus' ,
      data: {
        state: state
      }
    })
  }

}

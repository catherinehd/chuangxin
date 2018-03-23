import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable()
export class HomeService {

  constructor(private httpClientService: HttpClientService ) { }

  getrankingList(email) {
    return this.httpClientService.getMethod({
      url: 'news/getList',
    })
  }

  getUniversityList(page) {
    return this.httpClientService.getMethod({
      url: '/web/usity/queryUsityList/'+page,
    })
  }

  getUniversityDetailList(id) {
    return this.httpClientService.getMethod({
      url: '/web/usity/queryUsityById/'+id,
    })
  }

  getMiddleSchoolList(page) {
    return this.httpClientService.getMethod({
      url: '/web/middle/queryMiddleList/'+page,
    })
  }


  getMiddleSchoolDetailList(id) {
    return this.httpClientService.getMethod({
      url: '/web/middle/queryMiddleById/'+id,
    })
  }

  searchUsity(page, schoolname) {
    return this.httpClientService.postMethod({   //同时返回总条数
      url: '/web/usity/serchUsityByName/' + page,
      data: {
        usityName: schoolname,
      }
    })
  }

  searchMiddle(page,name) {
    return this.httpClientService.postMethod({   //同时返回总条数
      url: '/web/middle/serchMiddleByName/'+ page,
      data: {
        middleName: name,
      }
    })
  }

}



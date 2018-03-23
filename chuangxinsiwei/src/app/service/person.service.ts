import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service'

@Injectable()
export class PersonService {

  constructor(private httpclientService: HttpClientService) { }

  getUserInfo() {
    return this.httpclientService.getMethod({
      url: '/web/user/queryUserInfoById',
    })
  }

}

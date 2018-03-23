import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable()
export class ProDevService {

  constructor(private httpclientService: HttpClientService) { }


  getProDev(page){
    return this.httpclientService.getMethod({
      url: '/web/workshop/queryWorkshopList/'+page,
    })
  }

  getProDevDetail(id) {
    return this.httpclientService.getMethod({
      url: '/web/workshop/queryWorkshopById/'+id,
    })
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  appName: string;
  tel: string;
  api: string;

  constructor() {
    this.initConfig('创新咖啡厅');
  }

  initConfig(appShorthand: string): void {
    switch (appShorthand) {
      case 'Chuangxin':
        this.appName = 'Chuangxin';
        this.tel = '123456';
        this.api = 'http://47.98.102.131/innovate/web';
        break;
      default:
        break;
    }

  }

}

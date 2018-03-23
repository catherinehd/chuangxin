import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.styl','../about-index/about-index.component.styl']
})
export class AdvisorComponent implements OnInit {

  isshow1: boolean;
  isshow2: boolean;
  isshow3: boolean;
  isshow4: boolean;

  showAll1: boolean;

  constructor(private navigateService: NavigateService) {
    this.isshow1 = false;
    this.isshow2 = false;
    this.isshow3 = true;
    this.isshow4 = false;

    this.showAll1 = false;
  }

  ngOnInit() {
  }

  go(url,title) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url)
  }

}

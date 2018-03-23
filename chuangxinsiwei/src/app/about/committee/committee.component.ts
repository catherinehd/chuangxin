import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.styl','../about-index/about-index.component.styl']
})
export class CommitteeComponent implements OnInit {

  isshow1: boolean;
  isshow2: boolean;
  isshow3: boolean;
  isshow4: boolean;

  showAll1: boolean;
  showAll2: boolean;
  showAll3: boolean;
  showAll4: boolean;

  constructor(private navigateService: NavigateService) {

    this.isshow1 = false;
    this.isshow2 = true;
    this.isshow3 = false;
    this.isshow4 = false;

    this.showAll1 = false;
    this.showAll2 = false;
    this.showAll3 = false;
    this.showAll4 = false;
  }

  ngOnInit() {
  }

  go(url,title) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url)
  }

}

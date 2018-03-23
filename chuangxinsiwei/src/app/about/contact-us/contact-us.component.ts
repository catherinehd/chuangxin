import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.styl','../about-index/about-index.component.styl']
})
export class ContactUsComponent implements OnInit {

  isshow1: boolean;
  isshow2: boolean;
  isshow3: boolean;
  isshow4: boolean;

  constructor(private navigateService: NavigateService) {
    this.isshow1 = false;
    this.isshow2 = false;
    this.isshow3 = false;
    this.isshow4 = true;
  }

  ngOnInit() {
  }

  go(url,title) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url)
  }

}

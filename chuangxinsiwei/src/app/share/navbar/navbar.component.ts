import { Component, OnInit, Input } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {
  @Input() currentTitle: number;
  num: number;

  currentId: number;
  showToggleId: number;
  hideToggle: boolean;

  constructor(private navigateService: NavigateService) {
    const pathArray = location.hash.split('/');
    //console.log(pathArray[1]);

    if(pathArray[1] === 'home') {
      this.currentId = 1;
    } else if(pathArray[1] === 'aboutChinaIcac') {
      this.currentId = 2;
    } else if(pathArray[1] === 'events') {
      this.currentId = 3;
    } else if(pathArray[1] === 'development') {
      this.currentId = 4;
    } else if(pathArray[1] === 'knowledge-center') {
      this.currentId = 5;
    } else if(pathArray[1] === 'news') {
      this.currentId = 6;
    } else if(pathArray[1] === 'membership') {
      this.currentId = 7;
    }
  }

  ngOnInit() {
  }

  gopage(url,num,title) {
    this.navigateService.push();
    if(title) {
      this.navigateService.pushToRoute(url+'/'+title)
    } else {
      this.navigateService.pushToRoute(url)
    }
    this.currentId = num;
    this.hideToggle = true;
  }

  showToggle(num) {
    this.showToggleId = num;
    this.hideToggle = false;
  }

  notShowToggle() {
    this.hideToggle = true;
  }


}

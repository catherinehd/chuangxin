import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.styl']
})
export class ParamsComponent implements OnInit {

  classical: boolean; // 经典为true

  constructor() { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (location.hash.indexOf('contradiction/03/params') !== -1) {
      this.classical = false;
    } else {
      this.classical = true;
    }
  }

}

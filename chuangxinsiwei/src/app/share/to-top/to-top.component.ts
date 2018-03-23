import { Component, OnInit, AfterViewChecked,  } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.styl']
})
export class ToTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toTop() {
    //const top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}

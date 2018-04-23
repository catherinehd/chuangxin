import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.styl']
})
export class HomeIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

}

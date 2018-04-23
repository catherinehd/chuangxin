import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-person-index',
  templateUrl: './person-index.component.html',
  styleUrls: ['./person-index.component.styl']
})
export class PersonIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

}

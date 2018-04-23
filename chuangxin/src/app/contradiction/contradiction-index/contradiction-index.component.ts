import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-contradiction-index',
  templateUrl: './contradiction-index.component.html',
  styleUrls: ['./contradiction-index.component.styl']
})
export class ContradictionIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

}

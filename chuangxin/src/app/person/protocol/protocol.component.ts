import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.styl']
})
export class ProtocolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

}

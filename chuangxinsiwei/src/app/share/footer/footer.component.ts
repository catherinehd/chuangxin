import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {

  showcode: boolean;

  constructor() {
    this.showcode = false;
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.styl']
})
export class PopComponent implements OnInit {

  @Input() popmodal: Modal;
  @Output() closePop = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closePop.emit();
  }

}

class Modal {
  constructor(
    public title?: string,
    public isLoginShow?: boolean
  ) {}
}

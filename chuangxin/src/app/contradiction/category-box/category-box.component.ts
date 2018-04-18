import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.styl']
})
export class CategoryBoxComponent implements OnInit {

  @Input() resultList: string[];
  @Output() chooseName = new EventEmitter<string>();
  @Output() chooseReverseName = new EventEmitter<string>();

  activeName: string; // 被选中的内容标题

  constructor() {
  }

  ngOnInit() {
  }


  choosename(name, id, principleId) {
    this.activeName = name;
    this.chooseName.emit(id);
  }

  choosereversename(name, id, principleId) {
    this.activeName = name;
    this.chooseReverseName.emit(principleId);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-knowledge-index',
  templateUrl: './knowledge-index.component.html',
  styleUrls: ['./knowledge-index.component.styl']
})
export class KnowledgeIndexComponent implements OnInit {

  repositoryIndex: boolean; // 知识库首页为true，false显示搜索页
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

}

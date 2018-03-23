import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { NewsService } from '../../service/news.service';
declare var $:any;
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class NewsDetailComponent implements OnInit {

  news: newsModel = new newsModel(0,'',1,'','','',0,0);

  constructor(private navigateService: NavigateService,
              private newsService: NewsService) { }

  ngOnInit() {
    this.getId();
  }

  setFooter() {
    console.log('1');
    console.log($('body').height());
    console.log($(window).height());
    if(($('body').height()) < $(window).height()){
      $('footer').css({"position":"fixed","bottom":"0"});
    } else {
      $('footer').css({"position":"relative","bottom":"auto"});
    }

    window.onload = function() {
      console.log('2');
      console.log($('body').height());
      console.log($(window).height());
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }

    window.onresize = function() {
      console.log('3');
      console.log($('body').height());
      console.log($(window).height());
      if(($('body').height()) < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  getId() {
    //获取id
    const id = Number(location.hash.split('/')[3]);
    //根据id获取页面内容
    this.newsService.getNewsDetail(id).subscribe(res => {
      this.show(res.data), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });
  }

  show(data){
    this.news = data;
    this.news.ncTime = this.format(this.news.ncTime);
    this.setFooter();
  }

  format(t) {
    let unixTimestamp = new Date(t);
    let mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let commonTime = mon[unixTimestamp.getMonth()] + ' ' + unixTimestamp.getDate() + ', ' + unixTimestamp.getFullYear();
    return commonTime;
  }

}

class newsModel {
  constructor(public ncId: number,
              public ncTime: string,
              public ncRole: number,
              public ncUrl: string,
              public ncContent: string,
              public ncTitle: string,
              public createTime: number,
              public updateTime: number,
              ) {}
}


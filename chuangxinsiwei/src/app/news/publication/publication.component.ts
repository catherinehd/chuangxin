import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { NewsService } from '../../service/news.service';
declare var $:any;
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.styl','../news-index/news-index.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class PublicationComponent implements OnInit {

  hasNews: boolean;
  showLists: any;
  page: any = {pageIndex: 1, pageCount: 1};  //获取当前页和总页数

  constructor(private navigateService: NavigateService,
              private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsList(1,1).subscribe( res => {
      this.showList(res) , err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });
  }

  setFooter(n) {
    if($('body').height() < $(window).height()){
      $('footer').css({"position":"fixed","bottom":"0"});
    } else {
      $('footer').css({"position":"relative","bottom":"auto"});
    }

    window.onload = function() {
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }

    window.onresize = function() {
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  showList(list) {
    this.showLists = list.rows;
    for(let i = 0;i < this.showLists.length; i++){
      let t = this.showLists[i].ncTime;
      this.showLists[i].ncTime = this.format(t);
    }
    this.page.pageCount = list.total;
    if(list.rows.length > 0) {
      this.hasNews = true;
    } else {
      this.hasNews = false;
    };
    this.setFooter(this.showLists.length);
  }

  format(t) {
    let unixTimestamp = new Date(t);
    let mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let commonTime = mon[unixTimestamp.getMonth()] + ' ' + unixTimestamp.getDate() + ', ' + unixTimestamp.getFullYear();
    return commonTime;
  }

  go(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  onShowPage(page) {
    this.page.pageIndex = page;

    this.newsService.getNewsList(0,page).subscribe(res => {
      this.showList(res), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });

  }

}

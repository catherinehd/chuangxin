import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { ProDevService } from '../../service/pro-dev.service';
declare var $:any;
@Component({
  selector: 'app-pro-detail',
  templateUrl: './pro-detail.component.html',
  styleUrls: ['./pro-detail.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class ProDetailComponent implements OnInit {

  news: newsModel = new newsModel(0,'', 0,'','','','','','','','');

  constructor(
    private navigateService: NavigateService,
    private prodevService: ProDevService
  ) { }

  ngOnInit() {
    this.getId();
  }

  setFooter() {
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

  getId() {
    //获取id
    const id = Number(location.hash.split('/')[3]);
    //根据id获取页面内容
    this.prodevService.getProDevDetail(id).subscribe(res => {
    this.show(res.data), err => {
    if (err && err.status === 401) this.navigateService.pushToRoute('/home');
    }
    });
  }

  show(data) {
    this.news = data;
    this.news.wsTime = this.format(this.news.wsTime);
    this.setFooter();
  }

  format(t) {
    let unixTimestamp = new Date(t);
    let mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let commonTime = mon[unixTimestamp.getMonth()] + ' ' + unixTimestamp.getDate() + ', ' + unixTimestamp.getFullYear();
    return commonTime;
  }

  gopage(url) {
    window.open(url);
  }

}

class newsModel {
  constructor(public wsId: number,
              public wsTime: string,
              public state: number,
              public createBy: string,
              public createTime: string,
              public updateBy: string,
              public updateTime: string,
              public wsUrl: string,
              public wsContent: string,
              public wsTitle: string,
              public wsDurl: string) {}
}

import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { EventsService } from '../../service/events.service';
declare var $:any;
@Component({
  selector: 'app-detail-workshop',
  templateUrl: './detail-workshop.component.html',
  styleUrls: ['./detail-workshop.component.styl','../detail/detail.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class DetailWorkshopComponent implements OnInit {
  news: newsModel = new newsModel('','', 0,'','',0,'','','','','','','',0);

  constructor(private eventService: EventsService,
              private navigateService: NavigateService,) { }

  ngOnInit() {
    this.getId();
  }

  setFooter() {
    if($('body').height() < $(window).height()){
      $('footer').css({"position":"fixed","bottom":"0"});
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
    const id = Number(location.hash.split('/')[4]);
    //根据id获取页面内容
    this.eventService.getDetailEventes(id).subscribe(res => {
      this.news = res.data;
      this.news.newsTime = this.format(this.news.newsTime);
    });
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
  constructor(public createTime: string,
              public updateTime: string,
              public newsId: number,
              public newsTheme: string,
              public newsTime: string,
              public state: number,
              public createBy: string,
              public updateBy: string,
              public newsPlace: string,
              public newsPerson: string,
              public newsImage: string,
              public newsInfo: string,
              public newsTitle: string,
              public newsRole: number) {}
}

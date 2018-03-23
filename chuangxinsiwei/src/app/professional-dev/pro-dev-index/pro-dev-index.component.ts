import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { ProDevService } from '../../service/pro-dev.service';
import { PersonService } from '../../service/person.service';
import { UserModel } from '../../model/user.model';
declare var $:any;
@Component({
  selector: 'app-pro-dev-index',
  templateUrl: './pro-dev-index.component.html',
  styleUrls: ['./pro-dev-index.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class ProDevIndexComponent implements OnInit {
  modal = {
    title: 'CHINAICAC MEMBER SIGN IN',
    isSigninShow: false,
    closeShow: false,
  }

  hasWebinar: boolean;
  showLists: any;
  page: any = {pageIndex: 1, pageCount: 1};  //获取当前页和总页数

  constructor(private navigateService: NavigateService,
              private personService: PersonService,
              private prodevService: ProDevService) {
    this.hasWebinar = true;
  }

  ngOnInit() {
    this.setFooter(0);
    this.personService.getUserInfo().subscribe(res => {
      res.ok ?  this.getList() : this.modal.isSigninShow = true ;
    });
  }

  setFooter(n) {

    if(($('body').height()+166*n) < $(window).height()){
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

  getList() {
    this.modal.isSigninShow = false;
    //查询第一页数据列表
    this.prodevService.getProDev(1).subscribe(res => {
      this.showList(res), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });
  }

  showList(data) {
    this.showLists = data.rows;
    for(let i = 0;i < this.showLists.length; i++){
      let t = this.showLists[i].wsTime;
      this.showLists[i].wsTime = this.format(t);
    }
    //console.log(this.showLists);
    for(let i = 0; i<this.showLists.length; i++){
      //this.showLists[i].
    }
    this.page.pageCount = data.total;
    if(data.rows.length > 0) {
      this.hasWebinar = true;
    } else {
      this.hasWebinar = false;
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

    this.prodevService.getProDev(page).subscribe(res => {
      this.showList(res), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });
  }

  onConfirm() {
    this.navigateService.pushToRoute('./home');
  }

}

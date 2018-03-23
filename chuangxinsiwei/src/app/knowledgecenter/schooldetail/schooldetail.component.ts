import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HomeService } from '../../service/center.service';
import { PersonService } from '../../service/person.service';

import { schoolModel } from '../../model/school.model';

declare var $:any;

@Component({
  selector: 'app-schooldetail',
  templateUrl: './schooldetail.component.html',
  styleUrls: ['./schooldetail.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class SchooldetailComponent implements OnInit {

  showOverview: boolean;
  showRequirements: boolean;
  showOfficer: boolean;
  modal = {
    title: 'CHINAICAC MEMBER SIGN IN',
    isSigninShow: false,
  };

  school: schoolModel = new schoolModel;

  constructor(private homeServicde: HomeService,
              private personService: PersonService,
              private navigateService: NavigateService) {
    this.showOverview = true;
    this.showRequirements = false;
    this.showOfficer =false;
  }

  ngOnInit() {
    this.personService.getUserInfo().subscribe(res => {
      res.ok ?  this.getId() : this.modal.isSigninShow = true ;
    });
  }

  setFooter() {
    console.log('1:'+$('body').height());
    console.log($(window).height());
    console.log($('.article').height());

    window.onload = function() {
      console.log('2:'+$('body').height());
      console.log($(window).height());
      console.log($('.article').height());
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }

    window.onresize = function() {
      console.log('3:'+$('body').height());
      console.log($(window).height());
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  getId() {
    this.modal.isSigninShow = false;
    //获取id
    const id = Number(location.hash.split('/')[3]);
    //根据id获取页面内容
    this.homeServicde.getUniversityDetailList(id).subscribe(res => {
      this.show(res.data), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });
  }

  show(data) {
    this.school = data;
    let t = this.school.usityCountry;
    this.school.usityCountry = t.toUpperCase();
    this.setFooter();
  }

  format(t) {
    let unixTimestamp = new Date(t);
    let mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let commonTime = mon[unixTimestamp.getMonth()] + ' ' + unixTimestamp.getDate() + ', ' + unixTimestamp.getFullYear();
    return commonTime;
  }

}


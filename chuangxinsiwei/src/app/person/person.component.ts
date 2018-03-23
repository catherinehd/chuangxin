import { Component, OnInit } from '@angular/core';
import { PersonService } from '../service/person.service';
import { NavigateService } from '../service/navigate.service';
import { UserModel } from '../model/user.model';
declare var $:any;
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.styl','../share/breadcrumb/breadcrumb.component.styl']
})
export class PersonComponent implements OnInit {
  modal = {
    title: 'CHINAICAC MEMBER SIGN IN',
    isSigninShow: false,
    closeShow: false,
  };

  showperson:boolean;
  showmodifyps:boolean;
  user: UserModel = new UserModel();
  isLogin: boolean;

  constructor(private personService: PersonService,
              private navigateService: NavigateService,) {
    this.showperson = true;
    this.showmodifyps = false;
  }

  ngOnInit() {
    this.personService.getUserInfo().subscribe(res => {
      res.ok ? this.success() : this.modal.isSigninShow = true ;
    });
  }

  success() {
    this.isLogin = true;
    this.setFooter();
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
      console.log($('body').height());
      console.log($(window).height());
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  onConfirm() {
    this.navigateService.pushToRoute('./home');
  }

}

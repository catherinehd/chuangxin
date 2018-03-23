import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { HomeService } from '../../service/center.service'
import { PersonService } from '../../service/person.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { schoolModel } from '../../model/school.model';
import { UserModel } from '../../model/user.model';

declare var $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl','../school/school.component.styl','../../share/breadcrumb/breadcrumb.component.styl']
})
export class SearchComponent implements OnInit {

  modal = {
    title: 'ChinaICAC Member Sign in',
    isSigninShow: false,
  };

  user: UserModel = new UserModel();
  searchForm: FormGroup;
  search: SearchModel = new SearchModel('');
  isempty: boolean;
  querymsg: string;
  university: boolean;
  showLists: schoolModel[] = [];
  page: any = {pageIndex: 1, pageCount:1};  //获取当前页和总页数

  constructor(private navigateService: NavigateService,
              private formBuilder: FormBuilder,
              private personService: PersonService,
              private centerService: HomeService) {
    this.isempty = false;
  }

  ngOnInit() {
    //需要登录才可以查看
    this.personService.getUserInfo().subscribe(res => {
      res.ok ?  this.getLists() : this.modal.isSigninShow = true ;
    });
    this.buildForm();
    this.querymsg = location.hash.split('/')[4];
    if(location.hash.split('/')[2] === 'university') {
      this.university = true;
    } else {
      this.university = false;
    }
  }

  setFooter(n) {
    window.onload = function() {
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }

    window.onresize = function() {
      if(($('body').height() + 363*(Math.ceil(n/4))) < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  getLists() {
    this.modal.isSigninShow = false;
    //查询第一页数据列表
    //获取搜索学校列表到list,如果为空,isempty=true.若不为空,isempty=false.
    if(this.university === true) {
      this.centerService.searchUsity('1',this.querymsg).subscribe( res => {
        this.showList(res);
      });
    } else {
      this.centerService.searchMiddle('1',this.querymsg).subscribe( res => {
        this.showList(res);
      });
    }

  }

  showList(list) {
    //console.log(typeof(list.total));   //search的时候返回了总条数,设置相应的pagecount.
    this.showLists = list.rows;
    this.page.pageCount = Math.ceil((list.total)/12);
    //console.log(this.page.pageCount);
    if(list.rows.length > 0) {
      this.isempty = false;
    } else {
      this.isempty = true;
    };
    this.setFooter(this.showLists.length);
  }

  buildForm(){
    this.searchForm = this.formBuilder.group({
      'msg': [this.search.msg, [
        Validators.required,
      ]]
    });
  }

  gopage(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  gopage2(url) {
    window.open(url);
  }

    onShowPage(page) {
    this.page.pageIndex = page;

    this.centerService.getUniversityList(page).subscribe(res => {
      this.showList(res), err => {
        if (err && err.status === 401) this.navigateService.pushToRoute('/home');
      }
    });

  }

  searchUni() {
    if(this.university) {
      if(this.searchForm.value.msg) {
        this.navigateService.pushToRoute('./knowledge-center/university/search', this.searchForm.value.msg);
      } else {
        this.navigateService.pushToRoute('./knowledge-center/university');
      };
      this.centerService.searchUsity('1',this.searchForm.value.msg).subscribe( res => {
        this.showList(res);
      });
    } else {
      if(this.searchForm.value.msg) {
        this.navigateService.pushToRoute('./knowledge-center/high-school/search', this.searchForm.value.msg);
      } else {
        this.navigateService.pushToRoute('./knowledge-center/high-school');
      };
      this.centerService.searchMiddle('1',this.searchForm.value.msg).subscribe( res => {
        this.showList(res);
      });
    }
  }

  getList(){
    if(this.university) {
      this.navigateService.pushToRoute('./knowledge-center/university');
    } else {
      this.navigateService.pushToRoute('./knowledge-center/high-school');
    }

  }

  onConfirm() {
    this.navigateService.pushToRoute('./home');
  }

}

class SearchModel {
  constructor(public msg: string,) {}
}

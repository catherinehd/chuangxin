import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service'
import { UserStoreService } from '../../service/user-store.service'
import { PersonService } from '../../service/person.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  user: UserModel;
  withCredentials: boolean;


  modal = {
    title: 'CHINAICAC MEMBER SIGN IN',
    isSigninShow: false,
    closeShow: true,
  }

  constructor(private navigateService: NavigateService,
              private personService: PersonService,
              private userstoreService: UserStoreService) {

    this.personService.getUserInfo().subscribe(res => {
      res.ok ?  this.getUser(res.data) : this.isLogin = false;
    })
  }

  ngOnInit() {
  }

  getUser(data) {
    this.isLogin = true;
    this.user =  data;
  }

  signout() {
    this.userstoreService.logout().subscribe(res => {
      this.outSuccess();
    });
  }

  outSuccess() {
    this.navigateService.clearRouteList();
    location.reload();
  }


  go(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  onConfirm() {
    this.modal.isSigninShow = false;
  }

}

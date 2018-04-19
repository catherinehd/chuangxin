import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.styl']
})
export class PersonInfoComponent implements OnInit {

  userPhone: string; // 已经登录的用户的手机号
  userInfo = new UserInfo('', '', '', '', '', '');  // 用户信息

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.testIsLogin().subscribe(res => {
      if (res.ok) {
        this.userPhone = res.data.uPhone;
        this.personService.editUserPhoneNumber(this.userPhone).subscribe( res => {
          if (res.ok) {
            this.userInfo.phone = res.data.uPhone;
            this.userInfo.uname = res.data.uName;
            this.userInfo.email = res.data.uMail;
            this.userInfo.sex = res.data.uSex;
            this.userInfo.field = res.data.uField;
            this.userInfo.work = res.data.uCompany;
          }
        });
      }
    });
  }

}

class UserInfo {
  constructor(
    public  phone: string,
    public  uname: string,
    public  email: string,
    public sex:  string,
    public field: string,
    public work: string
  ) {}
}

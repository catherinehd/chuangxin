import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.styl']
})
export class PersonInfoComponent implements OnInit {

  userPhone: string; // 已经登录的用户的手机号
  userInfo = new UserInfo('', '', '', '', '', '', '');  // 用户信息
  erremail: string;
  errfield: string;
  errsex: string;
  errwork: string;
  sexvalue: string; // 选择的性别
  msg: string; // 修改成功弹窗

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.msg = '';
    this.personService.testIsLogin().subscribe(res => {
      if (res.ok) {
        this.userPhone = res.data.uPhone;
        this.personService.editUserPhoneNumber(this.userPhone).subscribe( res => {
          if (res.ok) {
            this.userInfo.phone = res.data.uPhone;
            this.userInfo.username = res.data.userName;
            this.userInfo.uname = res.data.uName;
            this.userInfo.email = res.data.uMail;
            this.userInfo.sex = res.data.uSex;
            this.userInfo.field = '航空航天';
            this.userInfo.work = res.data.uCompany;
          }
        });
      }
    });
  }

  test(msg, value) {
    switch (msg) {
      case 'email':
        // 判断用户姓名是否输入正确
        if (value === '') {
          this.erremail = '邮箱不能为空';
        } else if (value.match(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)) {
          this.erremail = '';
        } else {
          this.erremail = '邮箱格式错误';
        }
        break;
      case 'field':
        if (value === '') {
          this.errfield = '请选择所属领域';
        } else {
          this.errfield = '';
        }
        break;
      case 'sex':
        this.sexvalue = value;
        break;
      case 'work':
        if (value === '') {
          this.errwork = '单位名称不能为空';
        } else {
          this.errwork = '';
        }
        break;
      default:
        break;
    }
  }

  submit(name, uname, uphone, uemail, usex, ufield, ucompany) {
    if (this.erremail || this.errfield || this.errwork) {
      return;
    }
    this.personService.editUserInfo(name, uname, uphone, uemail, usex, ufield, ucompany).subscribe(res => {
      if (res.ok) {
        this.userInfo.phone = res.data.uPhone;
        this.userInfo.username = res.data.userName;
        this.userInfo.uname = res.data.uName;
        this.userInfo.email = res.data.uMail;
        this.userInfo.sex = res.data.uSex;
        this.userInfo.field = res.data.uField;
        this.userInfo.work = res.data.uCompany;
        this.msg = '修改成功';
        setTimeout( () => {
          this.msg = '';
        }, 3000);
      }
    });
  }
}

class UserInfo {
  constructor(
    public  phone: string,
    public  uname: string,
    public username: string,
    public  email: string,
    public sex:  string,
    public field: string,
    public work: string,
  ) {}
}

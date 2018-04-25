import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';
declare var $: any;

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
  fieldvalue: string; // 选择的领域
  msg: string; // 修改成功弹窗
  uid: string; // user 的id

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.msg = '';
    this.personService.testIsLogin(localStorage.getItem('cxtoken')).subscribe(res => {
      if (res.ok) {
        const user = JSON.parse(res.data);
        this.userPhone = user.uPhone;
        this.personService.editUserPhoneNumber(this.userPhone).subscribe( res2 => {
          if (res2.ok) {
            this.userInfo.phone = res2.data.uPhone;
            this.userInfo.username = res2.data.userName;
            this.userInfo.uname = res2.data.uName;
            this.userInfo.email = res2.data.uMail;
            this.userInfo.sex = res2.data.uSex;
            this.userInfo.field = res2.data.uField;
            this.userInfo.work = res2.data.uCompany;
            this.uid = res2.data.uId;
            this.sexvalue = res2.data.uSex;
            this.fieldvalue = res2.data.uField;
            if (this.sexvalue === '女') {
              $('#woman').attr('checked', 'checked');
            } else {
              $('#man').attr('checked', 'checked');
            }
            if (this.fieldvalue === '食品农业') {
              $('#1').attr('selected', 'selected');
            } else if (this.fieldvalue === '电力通信') {
              $('#2').attr('selected', 'selected');
            } else if (this.fieldvalue === '航空航天') {
              $('#3').attr('selected', 'selected');
            } else if (this.fieldvalue === '化工领域') {
              $('#4').attr('selected', 'selected');
            } else if (this.fieldvalue === '能源环境') {
              $('#5').attr('selected', 'selected');
            } else if (this.fieldvalue === '建筑运输') {
              $('#6').attr('selected', 'selected');
            } else if (this.fieldvalue === '生活教育') {
              $('#7').attr('selected', 'selected');
            } else if (this.fieldvalue === '机械工业') {
              $('#8').attr('selected', 'selected');
            } else if (this.fieldvalue === '电子信息') {
              $('#9').attr('selected', 'selected');
            } else if (this.fieldvalue === '地质水利') {
              $('#10').attr('selected', 'selected');
            } else if (this.fieldvalue === '医疗保健') {
              $('#11').attr('selected', 'selected');
            } else if (this.fieldvalue === '计算机') {
              $('#12').attr('selected', 'selected');
            } else {
              $('#13').attr('selected', 'selected');
            }
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
    this.personService.editUserInfo(name, uname, uphone, uemail, usex, ufield, ucompany, this.uid).subscribe(res => {
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

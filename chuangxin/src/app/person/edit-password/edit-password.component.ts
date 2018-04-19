import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['../person-info/person-info.component.styl' , './edit-password.component.styl']
})
export class EditPasswordComponent implements OnInit, OnDestroy {

  showpwd: boolean; // 显示密码为true
  showpwd2: boolean; // 显示密码为true
  errpwd1: string;
  errpwd2: string;
  errcode: string;
  phonenumber: string; // 登录用户的手机号
  iscounting: boolean; // 计时状态
  count: number; // 倒计时
  timer: any; // 计时器
  pwd1: string; // 密码
  pwd2: string; // 重复密码
  code: string; // 验证码
  msg: string; // 弹窗内容

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.showpwd = false;
    this.showpwd2 = false;
    this.msg = '';
    this.personService.testIsLogin().subscribe( res => {
      this.phonenumber = res.data.uPhone;
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  test(msg, value) {
    switch (msg) {
      case 'pwd1':
        // 判断密码是否输入正确
        if (value === '') {
          this.errpwd1 = '密码不能为空';
        } else if (value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/)) {
          this.errpwd1 = '';
          this.pwd1 = value;
        } else {
          this.errpwd1 = '密码由6-15位数字或字母组成';
        }
        break;
      case 'pwd2':
        // 判断重复密码是否输入正确
        if (value === '') {
          this.errpwd2 = '重复密码不能为空';
        } else if ( value === this.pwd1) {
          this.errpwd2 = '';
          this.pwd2 = value;
        } else {
          this.errpwd2 = '两次密码不一致';
        }
        break;
      case 'code':
        // 判断验证码是否输入正确
        if (value === '') {
          this.errcode = '验证码不能为空';
        } else {
          this.personService.testCode(value, this.phonenumber).subscribe( res => {
            if (res.ok) {
              this.errcode = '';
              this.code = value;
            } else {
              this.errcode = '验证码错误';
            }
          });
        }
        break;
      default:
        break;
    }
  }

  getcode() {
    this.personService.getCode(this.phonenumber).subscribe( res => {
      if (res.ok) {
        this.gocound();
      } else {
        this.errcode = res.msg;
      }
    });
  }

  // 倒计时
  gocound() {
    clearInterval(this.timer);
    this.iscounting = true;
    this.count = 60;
    this.timer = setInterval( () => {
      this.count--;
      if (this.count <= 0) {
        clearInterval( this.timer);
        this.iscounting = false;
      }
    }, 1000);
  }

  // 提交修改
  submit() {
    this.personService.editPwd(this.pwd1, this.phonenumber).subscribe( res => {
      if (res.ok) {
        this.msg = res.msg;
        setTimeout( () => {
          this.msg = '';
          // document.getElementsByTagName('input')[0].value = '';
        }, 3000);
      }
    });
  }
}

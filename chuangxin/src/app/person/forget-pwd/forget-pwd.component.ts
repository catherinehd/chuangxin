import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import {  PersonService } from '../../service/person.service';
declare var $: any;

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['../register/register.component.styl' , './forget-pwd.component.styl']
})
export class ForgetPwdComponent implements OnInit {

  showpwd: boolean; // 显示密码为true
  showpwd2: boolean; // 显示密码为true
  errpwd1: string;
  successpwd1: boolean;
  errpwd2: string;
  successpwd2: boolean;
  errcode: string;
  successcode: boolean;
  errphone: string
  successphone: boolean;
  pwd1: string; // 密码
  pwd2: string; // 重复密码
  code: string; // 验证码
  phone: string; // 手机号
  msg: string; // 弹窗内容
  hasphone: boolean;  // 已经填写手机号

  iscounting: boolean; // 计时状态
  count: number; // 倒计时
  timer: any; // 计时器

  popmodal = {
    title: '用户登录',
    isLoginShow: false
  }


  constructor(private personService: PersonService,
              private navigateService: NavigateService) {
    this.phone = '';
    this.code = '';
    this.pwd1 = '';
    this.pwd2 = '';
    this.hasphone = false;
  }

  ngOnInit() {
    setTimeout(function() {
    $('.wrap').css('min-height', $(window).height());
  }, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  setValue(value) {
    this.phone = value;
  }

  test(msg, value) {
    switch (msg) {
      case 'pwd1':
        // 判断密码是否输入正确
        if (value === '') {
          this.errpwd1 = '重复密码不能为空';
          this.successpwd1 = false;
        } else {
          if (value.match(/^[0-9A-Za-z]{6,15}$/)) {
            if (this.pwd2 && value === this.pwd2) {
              this.pwd1 = value;
              this.successpwd1 = true;
              this.successpwd2 = true;
              this.errpwd2 = '';
              this.errpwd1 = '';
            }  else if (this.pwd2 && value !== this.pwd2) {
              this.pwd1 = value;
              this.errpwd1 = '';
              this.errpwd2 = '两次密码不一致';
              this.successpwd2 = false;
              this.successpwd1 = true;
            } else {
              this.pwd1 = value;
              this.errpwd1 = '';
              this.successpwd1 = true;
              return;
            }
          } else {
            this.errpwd1 = '密码由6-15位数字或字母组成';
            this.successpwd1 = false;
          }
        }
        break;
      case 'pwd2':
        // 判断重复密码是否输入正确
        if (value === '') {
          this.errpwd2 = '重复密码不能为空';
          this.successpwd2 = false;
        } else {
          if (value.match(/^[0-9A-Za-z]{6,15}$/)) {
            if (this.pwd1 && value === this.pwd1) {
              this.pwd2 = value;
              this.successpwd2 = true;
              this.errpwd2 = '';
            }  else if (this.pwd1 && value !== this.pwd1) {
              this.pwd2 = value;
              this.errpwd2 = '两次密码不一致';
              this.successpwd2 = false;
            } else {
              this.pwd2 = value;
              this.errpwd2 = '';
              this.successpwd2 = true;
              return;
            }
          } else {
            this.errpwd2 = '密码由6-15位数字或字母组成';
            this.successpwd2 = false;
          }
        }
        break;
      case 'code':
        // 判断验证码是否输入正确
        if (value === '') {
          this.errcode = '验证码不能为空';
          this.successcode = false;
        } else {
          this.personService.testCode(value, this.phone).subscribe( res => {
            if (res.ok) {
              this.errcode = '';
              this.code = value;
              this.successcode = true;
            } else {
              this.errcode = '验证码错误';
              this.successcode = false;
            }
          });
        }
        break;
      case 'phone':
        // 判断手机号是否输入正确
        if (value === '') {
          this.errphone = '手机号不能为空';
          this.hasphone = false;
          this.successphone = false;
        } else if (value.match(/^1[34578]\d{9}$/)) {
          this.personService.userNameUsed(value).subscribe(res => {
            if (res.ok) {
              this.errphone = '';
              this.phone = value;
              this.hasphone = true;
              this.successphone = true;
            } else {
              this.errphone = '该手机号未注册';
              this.hasphone = true;
            }
          });
        } else {
          this.errphone = '手机号格式不对';
          this.successphone = false;
        }
        break;
      default:
        break;
    }
  }

  getcode() {
    if (this.errphone) {
      return;
    }
    this.personService.getCode(this.phone).subscribe( res => {
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
    if (this.errphone || this.errcode || this.errpwd1 || this.errpwd2) {
      return;
    }
    this.personService.forgetpwd(this.pwd1, this.phone).subscribe( res => {
      if (res.ok) {
        this.msg = '重置密码成功';
        setTimeout( () => {
          this.msg = '';
          for (let i = 0 ; i < $('input').length; i++) {
            $('input')[i].value = '';
          }
          clearInterval(this.timer);
          this.iscounting = false;
          this.popmodal.isLoginShow = true;
        }, 3000);
      }
    });
  }

  closePop() {
    // 关闭模态框
    this.popmodal.isLoginShow = false;
  }
}

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
  successpwd1: string;
  errpwd2: string;
  successpwd2: string;
  errcode: string;
  successcode: string;
  errphone: string
  successphone: string;
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

  ngOnInit() {setTimeout(function() {
    $('.wrap').css('min-height', $(window).height());
  }, 0);
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
          if (this.pwd2 && (this.pwd2 !== this.pwd1)) {
            this.errpwd2 = '两次密码不一致';
          } else if (this.pwd2 && (this.pwd2 === this.pwd1)) {
            this.errpwd2 = '';
          }
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
          this.personService.testCode(value, this.phone).subscribe( res => {
            if (res.ok) {
              this.errcode = '';
              this.code = value;
            } else {
              this.errcode = '验证码错误';
            }
          });
        }
        break;
      case 'phone':
        // 判断手机号是否输入正确
        if (value === '') {
          this.errphone = '手机号不能为空';
          this.hasphone = false;
        } else if (value.match(/^1[34578]\d{9}$/)) {
          this.errphone = '';
          this.phone = value;
          this.hasphone = true;
        } else {
          this.errphone = '手机号格式不对';
        }
        break;
      default:
        break;
    }
  }

  getcode() {
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
        this.msg = res.msg;
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

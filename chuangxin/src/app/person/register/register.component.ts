import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PersonService } from '../../service/person.service';
import { NavigateService } from '../../service/navigate.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit, OnDestroy {

  msg: string; // 注册成功弹窗
  registerForm: FormGroup;
  register: Register = new Register('', '', '', '', '', '', '', '', '', '');

  showpwd1: boolean; // true的时候显示密码
  showpwd2: boolean; // true的时候显示重复密码
  count: number; // 获取验证码后的倒计时
  iscounting: boolean; // 在倒计时时候为true
  timer: any; // 计时器

  // 错误提示
  erruname: string; // 用户名错误
  successuname: boolean; // 用户名正确
  errname: string;
  successname: boolean;
  errpwd1: string;
  successpwd1: boolean;
  errpwd2: string;
  successpwd2: boolean;
  errphone: string;
  successphone: boolean;
  errcode: string;
  successcode: boolean;
  erremail: string;
  successemail: boolean;
  errfield: string;
  successfield: boolean;
  errwork: string;
  successwork: boolean;

  constructor(private formBuilder: FormBuilder,
              private navigateService: NavigateService,
              private personService: PersonService) {
  }

  ngOnInit() {
    this.buildForm();
    this.msg = '';
    setTimeout(function() {
      $('.wrap').css('min-height', $(window).height());
    }, 0);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  // 创建表单
  buildForm() {
    this.registerForm = this.formBuilder.group({
      'uname': [this.register.uname, [
        Validators.required,
        ]],
      'name': [this.register.name, [
        Validators.required
      ]],
      'pwd1': [this.register.pwd1, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/)
      ]],
      'pwd2': [this.register.pwd2, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/)
      ]],
      'phone': [this.register.phone, [
        Validators.required,
      ]],
      'code': [this.register.code, [
        Validators.required,
      ]],
      'email': [this.register.email, [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
      ]],
      'sex': [this.register.sex, [
        Validators.required,
      ]],
      'field': [this.register.field, [
        Validators.required,
      ]],
      'work': [this.register.work, [
        Validators.required,
      ]],
    });
  }

  // 判断输入信息是否正确
  test(msg) {
    switch (msg) {
      case 'uname':
        // 判断用户名是否输入正确
            if (this.registerForm.value.uname === '') {
              this.erruname = '用户名不能为空';
              this.successuname = false;
            } else if (this.registerForm.value.uname.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/)) {
              this.personService.testUserName(this.registerForm.value.uname).subscribe(res => {
                if (res.msg) {
                  this.erruname = '';
                  this.successuname = true;
                } else {
                  this.erruname = '用户名已存在';
                  this.successcode = false;
                }
              });
            } else {
              this.erruname = '用户名由6-10位数字和字母构成';
              this.successuname = false;
            }
            break;
      case 'name':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.name === '') {
          this.errname = '请输入用户姓名';
          this.successname = false;
        } else {
          this.errname = '';
          this.successname = true;
        }
        break;
      case 'pwd1':
        // 判断密码是否输入正确
        if (this.registerForm.value.pwd1 === '') {
          this.errpwd1 = '请输入密码';
          this.successpwd1 = false;
        } else if (this.registerForm.value.pwd1.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/)) {
          this.errpwd1 = '';
          this.successpwd1 = true;
          if (this.registerForm.value.pwd2 && (this.registerForm.value.pwd2 !== this.registerForm.value.pwd1)) {
            this.errpwd2 = '两次密码不一致';
            this.successpwd2 = false;
          } else if (this.registerForm.value.pwd2 && (this.registerForm.value.pwd2 === this.registerForm.value.pwd1)) {
            this.errpwd2 = '';
            this.successpwd2 = true;
          }
        } else {
          this.errpwd1 = '密码由6-15位数字或字母组成';
          this.successpwd1 = false;
        }
        break;
      case 'pwd2':
        // 判断重复密码是否输入正确
        if (this.registerForm.value.pwd2 === '') {
          this.errpwd2 = '重复密码不能为空';
          this.successpwd2 = false;
        } else if (this.registerForm.value.pwd2 === this.registerForm.value.pwd1) {
          this.errpwd2 = '';
          this.successpwd2 = true;
        } else {
          this.errpwd2 = '两次密码不一致';
          this.successpwd2 = false;
        }
        break;
      case 'phone':
        // 判断手机号是否输入正确
        if (this.registerForm.value.phone === '') {
          this.errphone = '手机号不能为空';
          this.successphone = false;
        } else if (this.registerForm.value.phone.match(/^1[34578]\d{9}$/)) {
          this.personService.testPhoneNumber(this.registerForm.value.phone).subscribe( res => {
            if (res.msg === 'OK') {
              this.errphone = '';
              this.successphone = true;
            } else {
              this.errphone = '手机号已存在';
              this.successphone = false;
            }
          });
        } else {
          this.errphone = '手机号格式不正确';
          this.successphone = false;
        }
        break;
      case 'code':
        // 判断验证码是否输入正确
        if (this.registerForm.value.code === '') {
          this.errcode = '验证码不能为空';
          this.successcode = false;
        } else {
          this.personService.testCode(this.registerForm.value.code, this.registerForm.value.phone).subscribe( res => {
            if (res.ok) {
              this.errcode = '';
              this.successcode = true;
            } else {
              this.errcode = '验证码错误';
              this.successcode = false;
            }
          });
        }
        break;
      case 'email':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.email === '') {
          this.erremail = '邮箱不能为空';
          this.successemail = false;
        } else if (this.registerForm.value.email.match(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)) {
          this.erremail = '';
          this.successemail = true;
        } else {
          this.erremail = '邮箱格式错误';
          this.successemail = false;
        }
        break;
      case 'field':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.field === '') {
          this.errfield = '请选择所属领域';
          this.successfield = false;
        } else {
          this.errfield = '';
          this.successfield = true;
        }
        break;
      case 'work':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.work === '') {
          this.errwork = '单位名称不能为空';
          this.successwork = false;
        } else {
          this.errwork = '';
          this.successwork = true;
        }
        break;
      default:
        break;
    }
  }

  // 获取验证码
  getcode() {
    this.personService.getCode(this.registerForm.value.phone).subscribe( res => {
      if (res.ok) {
        this.counting();
      } else {
        this.errcode = res.msg;
        this.successcode = false;
      }
    });
  }

  // 倒计时
  counting() {
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

  // 注册
  registerMember() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.erruname || this.errname || this.errpwd1 || this.errpwd2 || this.errphone || this.errcode || this.erremail ||
      this.errfield || this.errwork) {
      return;
    } else {
      this.personService.register(this.registerForm.value.uname, this.registerForm.value.name, this.registerForm.value.pwd1,
        this.registerForm.value.phone, this.registerForm.value.email, this.registerForm.value.sex, this.registerForm.value.field,
        this.registerForm.value.work, '').subscribe( res => {
        console.log(res);
        if (res.ok) {
          this.msg = '注册成功';
          setTimeout( () => {
            this.msg = '';
            this.navigateService.pushToRoute('/home');
          }, 3000);
        }
      });
    }
  }

}

class Register {
  constructor(
    public uname: string,
    public name: string,
    public pwd1: string,
    public pwd2: string,
    public phone: string,
    public code: string,
    public email: string,
    public sex: string,
    public field: string,
    public work: string
  ) {}
}

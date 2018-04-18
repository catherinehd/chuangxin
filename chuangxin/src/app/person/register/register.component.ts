import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  register: Register = new Register('', '', '', '', '', '', '', '', '', '');

  showpwd1: boolean; // true的时候显示密码
  showpwd2: boolean; // true的时候显示重复密码

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
              private personService: PersonService) {
  }

  ngOnInit() {
    this.buildForm();
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
              this.erruname = '用户名由6到10位数字和字母构成';
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
        } else {
          this.errpwd1 = '';
          this.successpwd1 = true;
        }
        break;
      case 'pwd2':
        // 判断重复密码是否输入正确
        if (this.registerForm.value.pwd2 === '') {
          this.errpwd2 = '请再次输入密码';
          this.successpwd2 = false;
        } else {
          this.errpwd2 = '';
          this.successpwd2 = true;
        }
        break;
      case 'phone':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.phone === '') {
          this.errphone = '请输入用户名';
          this.successphone = false;
        } else {
          this.errphone = '';
          this.successphone = true;
        }
        break;
      case 'code':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.code === '') {
          this.errcode = '请输入用户名';
          this.successcode = false;
        } else {
          this.errcode = '';
          this.successcode = true;
        }
        break;
      case 'email':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.email === '') {
          this.erremail = '请输入用户名';
          this.successemail = false;
        } else {
          this.erremail = '';
          this.successemail = true;
        }
        break;
      case 'field':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.field === '') {
          this.errfield = '请输入用户名';
          this.successfield = false;
        } else {
          this.errfield = '';
          this.successfield = true;
        }
        break;
      case 'work':
        // 判断用户姓名是否输入正确
        if (this.registerForm.value.work === '') {
          this.errwork = '请输入用户名';
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

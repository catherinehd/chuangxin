import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  register: Register = new Register('', '', '', '', '', '', '', '', '');

  showpwd1: boolean; // true的时候显示密码
  showpwd2: boolean; // true的时候显示重复密码

  // 错误提示
  erruname: string; // 用户名错误
  successuname: string; // 用户名正确

  constructor(private formBuilder: FormBuilder) {
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
    });
  }

  // 判断输入信息是否正确
  test(msg) {
    switch (msg) {
      case 'uname':
        // 判断用户名是否输入正确
            if (this.registerForm.value.uname === '') {
              this.erruname = '请输入用户名';
            } else {
              this.erruname = '';
            }
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
    public field: string
  ) {}
}

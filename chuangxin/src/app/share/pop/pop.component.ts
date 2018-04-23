import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PersonService } from '../../service/person.service';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.styl']
})
export class PopComponent implements OnInit {

  @Input() popmodal: Modal;
  @Output() closePop = new EventEmitter();

  loginForm: FormGroup;
  login: Login = new Login('', '');

  errmsg: string; // 错误提示
  showpwd: boolean; // 显示密码为true;
  remmember: string; // 0-不记住， 1-记住
  loginSuccess: string; // 登录成功为文字

  constructor(private formBuilder: FormBuilder,
              private navigateService: NavigateService,
              private personService: PersonService) { }

  ngOnInit() {
    this.errmsg = '';
    this.buildForm();
    this.remmember = '0';
    this.loginSuccess = '';
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      'uname': [this.login.uname, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/)
      ]],
      'pwd': [this.login.pwd, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]]
    });
  }

  // 检验表单格式
  testValid(msg) {
    switch (msg) {
      case 'uname':
        if (this.loginForm.value.uname === '') {
          this.errmsg = '用户名不能为空';
        } else if (this.loginForm.value.uname.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/)) {
          this.errmsg = '';
        } else {
          this.errmsg = '用户名由6-10位数字和字母构成';
        }
        break;
      case 'pwd':
        // 判断密码是否输入正确
        if (this.loginForm.value.pwd1 === '') {
          this.errmsg = '请输入密码';
        } else {
          this.errmsg = '';
        }
        break;
    }
  }

  // 错误提示
  showTip(msg) {
    this.errmsg = msg;
  }

  // 登录
  loginFunc() {
    this.personService.login(this.loginForm.value.uname, this.loginForm.value.pwd, this.remmember).subscribe( res => {
      if (res.ok) {
        this.errmsg = '';
        this.loginSuccess = '登录成功';
        this.navigateService.clearRouteList();
        localStorage.setItem('userInfo', this.loginForm.value.uname);
        setTimeout( () => {
          this.loginSuccess = '';
          this.close();
          // 登录成功后进入下一个路由
          this.navigateService.pushToNextRoute();
          location.reload();
        }, 2000);
      } else {
        this.errmsg = res.msg;
      }
    });
  }

  close() {
    this.closePop.emit();
  }

  checkvalue() {
    console.log(document.getElementsByTagName('input')[2].value);
  }
}

class Modal {
  constructor(
    public title?: string,
    public isLoginShow?: boolean
  ) {}
}

class Login {
  constructor(
    public uname: string,
    public pwd: string
  ) {}
}

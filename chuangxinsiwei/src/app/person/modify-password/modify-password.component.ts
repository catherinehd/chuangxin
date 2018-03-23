import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { UserService } from '../../service/user.service';
import { PersonService } from '../../service/person.service';
import { HttpClientService } from '../../service/http-client.service';
import { UserStoreService } from '../../service/user-store.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.styl']
})
export class ModifyPasswordComponent implements OnInit {

  pwd0: boolean;
  pwd1: boolean;
  pwd2: boolean;
  msg0: string;
  msg1: string;
  msg2: string;
  showSuccess: boolean;
  modifyPwdForm: FormGroup;
  pwd:PwdForm = new PwdForm('','','');
  validatorMsg = {
    pwd0: {
      required: '请填写密码',
      pattern: '密码由6-15英文或数字组成',
      minlength: '密码格式为6-15位',
      maxlength: '密码格式为6-15位'
    },
    pwd1: {
      required: '请填写密码',
      pattern: '密码由6-15英文或数字组成',
      minlength: '密码格式为6-15位',
      maxlength: '密码格式为6-15位'
    },
    pwd2: {
      required: '请填写密码',
      pattern: '密码由6-15英文或数字组成',
      minlength: '密码格式为6-15位',
      maxlength: '密码格式为6-15位'
    }
  }


  constructor(private navigateService: NavigateService,
              private userService: UserService,
              private personService: PersonService,
              private httpClientService: HttpClientService,
              private userStoreService: UserStoreService,
              private formBuilder: FormBuilder,) {
    this.pwd0 = true;
    this.pwd1 = true;
    this.pwd2 = true;
    this.msg0 = '';
    this.msg1 = '';
    this.msg2 = '';
    this.showSuccess = false;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.modifyPwdForm = this.formBuilder.group({
      'pwd0': [this.pwd.pwd0, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      'pwd1': [this.pwd.pwd1, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      'pwd2': [this.pwd.pwd2,[
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]]
    });
  }

  onSubmit() {
    console.log('reset');
    this.testvalid();
    if(this.msg2) {return}
    else {
      this.msg0 = '';
      this.msg1 = '';
      this.msg2 = '';
      this.userService.modifyPwd(this.modifyPwdForm.value.pwd0,this.modifyPwdForm.value.pwd1).subscribe(res => {
        res.ok ? this.modifySuccess() : this.showTip(res.msg);
      })
      //this.modifySuccess();
    }
  }

  modifySuccess() {
    this.showSuccess = true;
    const that = this;
    setTimeout(function(){ location.reload(); },2000)
  }

  testPw0(data) {
    const patt = new RegExp(/^[0-9a-zA-Z]{6,15}$/);
    if(patt.test(data)) {
      this.msg0 = '';
    } else {
      this.msg0 = '密码由6-15英文或数字组成';
    }
  }

  testPw1(data) {
    const patt = new RegExp(/^[0-9a-zA-Z]{6,15}$/);
    if(patt.test(data)) {
      this.msg1 = '';
    } else {
        this.msg1 = '密码由6-15英文或数字组成';
      }
  }

  testPw2(data) {
    const patt = new RegExp(/^[0-9a-zA-Z]{6,15}$/);
    if(patt.test(data)) {
        this.msg2 = '';
    } else {
      this.msg2 = '密码由6-15英文或数字组成';
    }
  }

  testvalid() {
    if(this.modifyPwdForm.value.pwd1 !== this.modifyPwdForm.value.pwd2) {
      this.msg2 = '两次密码输入不一致';
    } else {
      this.msg2 = '';
    }
  }

  go(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

  showTip(msg) {
    this.msg0 = msg;
  }

}

class PwdForm {
  constructor(public  pwd0: string,
              public  pwd1: string,
              public  pwd2: string) {}
}

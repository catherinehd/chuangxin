import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { UserService } from '../../service/user.service';
import { HttpClientService } from '../../service/http-client.service';
import { UserStoreService } from '../../service/user-store.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.styl']
})
export class VerifyEmailComponent implements OnInit {

  wrong: boolean;
  msg: string;
  isCounting: boolean;
  count: number;
  timer: any;

  emailForm: FormGroup;
  email: Email =new Email('','');
  validatorMsg = {
    email: {
      required: '请填写email',
      pattern: '请填写有效的email'
    },
    code: {
      required: '请填写验证码',
    }
  }

  constructor(
    private navigateService: NavigateService,
    private userService: UserService,
    private httpClientService: HttpClientService,
    private userStoreService: UserStoreService,
    private formBuilder: FormBuilder,
  ) {
    this.wrong = false;
    this.isCounting = false;
    this.msg = '';
  }

  ngOnInit() {
    this.buildForm();
    this.setFooter();
  }

  setFooter() {
    if($('body').height() < $(window).height()){
      $('footer').css({"position":"fixed","bottom":"0"});
    } else {
      $('footer').css({"position":"relative","bottom":"auto"});
    }

    window.onload = function() {
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }

    window.onresize = function() {
      console.log($('body').height());
      console.log($(window).height());
      if($('body').height() < $(window).height()){
        $('footer').css({"position":"fixed","bottom":"0"});
      } else {
        $('footer').css({"position":"relative","bottom":"auto"});
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  buildForm() {
    this.emailForm = this.formBuilder.group({
      'email': [this.email.email, [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
      ]],
      'code': [this.email.code, [
        Validators.required,
      ]]
    });
  }

  go(url,param) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url,param);
  }

  testemail() {
    const re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    const email = this.emailForm.value.email;
    return re.test(email);
  }

  getcode() {
    this.testemail();
    if(this.testemail()){
      this.showTip('')
      //获取验证码
      this.userService.getMsgCode(this.emailForm.value.email).subscribe(res => {
        res.ok ? this.getCodeSuccess() : this.showTip(res.msg);
      })
    } else {
      this.showTip('请填写有效的email')
    }
  }

  getCodeSuccess() {
    this.msg = '';
    this.counting();
  }

  testValid(){
    for (const field in this.email) {
      const control = this.emailForm.get(field);
      if(control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.showTip(this.validatorMsg[field][key]);
        }
      }
    }
  }

  showTip(msg) {
    this.msg = msg;
  }

  onSubmit() {
    this.testValid();
    if(!this.emailForm.valid) return;
    this.msg = '';
    this.userService.testMsgCode(this.emailForm.value.email,this.emailForm.value.code).subscribe(res => {
    res.ok ? this.testCodeSuccess() : this.showTip(res.msg);
    })
  }

  testCodeSuccess() {
    this.go('./person/reset-pwd',this.emailForm.value.email);
  }

  counting() {
    this.isCounting = true;
    this.count = 60;
    this.timer = setInterval(() => {
      this.count --;
      if (this.count <= 0) {
        clearInterval(this.timer);
        this.isCounting = false;
      }
    }, 1000);
  }

}

class Email {
  constructor(public  email: string,
              public code: string) {}
}

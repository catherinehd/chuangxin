import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { UserService } from '../../service/user.service';
import { HttpClientService } from '../../service/http-client.service';
import { UserStoreService } from '../../service/user-store.service';
import { PersonService } from '../../service/person.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: Register =new Register('','','','','','','','','','','','','','','','','','','');
  msg: string;
  timer: any;
  isCounting: boolean;
  count: number;
  prompt: boolean;
  isOpenEyesShow1 = true;
  isOpenEyesShow2 = true;
  hasceebcode: boolean;

  errWork: string;
  errEmail: string;
  errCode: string;
  errPwd1: string;
  errPwd2: string;
  errPrefix: string;
  fname: string;
  lname: string;
  errSchool: string;
  errJob: string;
  errCeeb: string;
  errrename: string;
  errremail: string;
  errreins: string;
  errrename2: string;
  errremail2: string;
  errreins2: string;
  errAgree: string;
  hasReferee: boolean;
  showceebdes: boolean;//显示ceeb的介绍
  highschool: boolean;//选择身份,如果是大学生则不需要ceebcode
  checkAgreement: boolean;

  isSafari: boolean;//是safari的时候改变password的样式

  workforlist: [{name:'Secondary／High School',value:'0'},{name:'Colllege or University',value:'0'}];
  test: string ='high school';

  constructor(private navigateService: NavigateService,
              private userService: UserService,
              private httpClientService: HttpClientService,
              private userStoreService: UserStoreService,
              private personService: PersonService,
              private formBuilder: FormBuilder,) {
    this.msg = '';
    this.isCounting = false;
    this.hasceebcode = true;
    this.prompt = false;
    this.highschool = true;
    this.hasReferee = true;
  }

  ngOnInit() {
    this.buildForm();
    this.setFooter();
    // this.checkAgreement = false;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.browser();
  }

  browser() {
    if(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0) {
      this.isSafari = true;
    } else {
      this.isSafari = false;
    }
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
    this.registerForm = this.formBuilder.group({
      'work': [this.register.work, [
        Validators.required,
      ]],
      'email': [this.register.email, [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
      ]],
      'code': [this.register.code, [
        Validators.required,
      ]],
      'pwd1': [this.register.pwd1, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      'pwd2': [this.register.pwd2, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+$/
        ),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      'prefix': [this.register.prefix, [
        Validators.required,
      ]],
      'firstname': [this.register.firstname, [
        Validators.required,
        Validators.maxLength(60)
      ]],
      'lastname': [this.register.lastname, [
        Validators.required,
        Validators.maxLength(60)
      ]],
      'preferredname': [this.register.preferredname, [
      ]],
      'school': [this.register.school, [
        Validators.required,
        Validators.maxLength(60)
      ]],
      'jobtitle': [this.register.jobtitle, [
        Validators.required,
        Validators.maxLength(60)
      ]],
      'ceebcode': [this.register.ceebcode, [
        Validators.maxLength(6),
        Validators.pattern(/^\d{6}$/)
      ]],
      'rename': [this.register.rename, [
        Validators.maxLength(60)
      ]],
      'reins': [this.register.reins, [
        Validators.maxLength(60)
      ]],
      'remail': [this.register.remail, [
        Validators.pattern(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
      ]],
      'rename2': [this.register.rename2, [
        Validators.maxLength(60)
      ]],
      'reins2': [this.register.reins2, [
        Validators.maxLength(60)
      ]],
      'remail2': [this.register.remail2, [
        Validators.pattern(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
      ]],
      'agreement':[this.register.agreement, [
      ]],
    });
  }


  onSubmit() {
    if (this.errEmail || this.errCode) return;
    if (!this.registerForm.valid) return;
    if (this.registerForm.value.pwd1 !== this.registerForm.value.pwd2 ) {this.errPwd2 = 'Passwords must match'; return;}

    if (this.highschool && this.hasReferee) {
      if (!this.registerForm.value.work || !this.registerForm.value.email || !this.registerForm.value.code || !this.registerForm.value.pwd1 || !this.registerForm.value.pwd2 || !this.registerForm.value.prefix || !this.registerForm.value.firstname || !this.registerForm.value.lastname || !this.registerForm.value.school || !this.registerForm.value.jobtitle || !this.registerForm.value.ceebcode || !this.registerForm.value.agreement) return;
      this.userService.register(this.registerForm.value.email,this.registerForm.value.pwd1,this.registerForm.value.work,this.registerForm.value.prefix,this.registerForm.value.firstname,this.registerForm.value.lastname,this.registerForm.value.preferredname,this.registerForm.value.school,this.registerForm.value.jobtitle,'','','',this.registerForm.value.ceebcode,'','','').subscribe(res => {
        res.ok ? this.setUser(res.data) : location.reload();//注册失败处理?
      });
    } else if(this.highschool && !this.hasReferee) {
      if(!this.registerForm.value.work || !this.registerForm.value.email || !this.registerForm.value.code || !this.registerForm.value.pwd1 || !this.registerForm.value.pwd2 || !this.registerForm.value.prefix || !this.registerForm.value.firstname || !this.registerForm.value.lastname || !this.registerForm.value.school || !this.registerForm.value.jobtitle || !this.registerForm.value.rename || !this.registerForm.value.reins || !this.registerForm.value.remail || !this.registerForm.value.rename2 || !this.registerForm.value.reins2 || !this.registerForm.value.remail2 || !this.registerForm.value.agreement || !this.registerForm.value.ceebcode ) return;
      this.userService.register(this.registerForm.value.email,this.registerForm.value.pwd1,this.registerForm.value.work,this.registerForm.value.prefix,this.registerForm.value.firstname,this.registerForm.value.lastname,this.registerForm.value.preferredname,this.registerForm.value.school,this.registerForm.value.jobtitle,this.registerForm.value.rename,this.registerForm.value.reins,this.registerForm.value.remail,this.registerForm.value.ceebcode,this.registerForm.value.rename2,this.registerForm.value.reins2,this.registerForm.value.remail2).subscribe(res => {
        res.ok ? this.setUser(res.data) : location.reload();//注册失败处理?
      })
    } else if(!this.highschool && this.hasReferee) {
    if (!this.registerForm.value.work || !this.registerForm.value.email || !this.registerForm.value.code || !this.registerForm.value.pwd1 || !this.registerForm.value.pwd2 || !this.registerForm.value.prefix || !this.registerForm.value.firstname || !this.registerForm.value.lastname || !this.registerForm.value.school || !this.registerForm.value.jobtitle || !this.registerForm.value.agreement) return;
      this.userService.register(this.registerForm.value.email,this.registerForm.value.pwd1,this.registerForm.value.work,this.registerForm.value.prefix,this.registerForm.value.firstname,this.registerForm.value.lastname,this.registerForm.value.preferredname,this.registerForm.value.school,this.registerForm.value.jobtitle,'','','','','','','').subscribe(res => {
        res.ok ? this.setUser(res.data) : location.reload();//注册失败处理?
      })
    } else {
      if (!this.registerForm.value.work || !this.registerForm.value.email || !this.registerForm.value.code || !this.registerForm.value.pwd1 || !this.registerForm.value.pwd2 || !this.registerForm.value.prefix || !this.registerForm.value.firstname || !this.registerForm.value.lastname || !this.registerForm.value.school || !this.registerForm.value.jobtitle || !this.registerForm.value.agreement || !this.registerForm.value.rename || !this.registerForm.value.reins || !this.registerForm.value.remail || !this.registerForm.value.rename2 || !this.registerForm.value.reins2 || !this.registerForm.value.remail2) return;
      this.userService.register(this.registerForm.value.email,this.registerForm.value.pwd1,this.registerForm.value.work,this.registerForm.value.prefix,this.registerForm.value.firstname,this.registerForm.value.lastname,this.registerForm.value.preferredname,this.registerForm.value.school,this.registerForm.value.jobtitle,this.registerForm.value.rename,this.registerForm.value.reins,this.registerForm.value.remail,'',this.registerForm.value.rename2,this.registerForm.value.reins2,this.registerForm.value.remail2).subscribe(res => {
        res.ok ? this.setUser(res.data) : location.reload();//注册失败处理?
      })
    }
  }

  setUser(data) {
    this.prompt = true;
  }

  loginSuccess(user) {
    this.userStoreService.storeUser(user);
    this.httpClientService.refreshHeaders(user.access_token);
    this.navigateService.clearRouteList();
   // this.navigateService.pushToRoute('./home');
    //location.reload();
  }

  getCode() {
      //获取验证码
      this.userService.getCode(this.registerForm.value.email).subscribe(res => {
        res.ok ? this.goSuccess() : this.errCode = res.msg;
      })
  }

  goSuccess() {
    this.counting();
  }

  counting() {
    clearInterval(this.timer);

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

  // ischecked() {
  //   if($('#agreement-input').is(':checked') === true) {
  //     this.checkAgreement = true;
  //   } else {
  //     this.checkAgreement = false;
  //   }
  // }

  showErr(str) {
    switch(str)
    {
      case 'work':
        if(this.registerForm.value.work === '') {
        this.errWork = 'please choose you work for';
        } else {
          this.errWork = '';
          if(this.registerForm.value.work === '1' ) {
            this.highschool = false;
            this.registerForm.value.ceebcode = '';
          } else {
            this.highschool = true;
          }
        }
        break;
      case 'email':
        if(this.registerForm.value.email === ''){
          this.errEmail = 'please input your email';
        } else {
          const re = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          const email = re.test(this.registerForm.value.email);
          if(email) {
            this.userService.testEmail(this.registerForm.value.email,1).subscribe(res => {
              res.ok ? this.errEmail ='' : this.errEmail = res.msg;
            })
          } else {
            this.errEmail = 'please input correct email'
          }
        }
        break;
      case 'code':
        if(this.registerForm.value.code === '') {
          this.errCode = 'please input your vertification code';
        } else {
          this.userService.testCode(this.registerForm.value.email,this.registerForm.value.code).subscribe(res => {
            res.ok ? this.errCode = '' : this.errCode = res.msg;
          })
        }
        break;
      case 'pwd1':
        if(this.registerForm.value.pwd1 === '') {
          this.errPwd1 = 'please input your password';
        } else {
          const re = /^[0-9a-zA-Z]{6,15}$/;
          const pwd = re.test(this.registerForm.value.pwd1);
          if(pwd) {
            this.errPwd1 = '';
          } else {
            this.errPwd1 = 'The password should be made up of 6-15 letters or numbers';
          }
        }
        break;
      case 'pwd2':
        if(this.registerForm.value.pwd2 === '') {
          this.errPwd2 = 'please repeat your password';
        } else {
          const re = /^[0-9a-zA-Z]+$/;
          const pwd = re.test(this.registerForm.value.pwd2);
          if(pwd) {
            if(this.registerForm.value.pwd2 === this.registerForm.value.pwd1){
              this.errPwd2 = '';
            } else {
              this.errPwd2 = 'Passwords must match';
            }
          } else {
            this.errPwd2 = 'The password should be made up of 6-15 letters or numbers';
          }
        }
        break;
      case 'prefix':
        if(this.registerForm.value.prefix === '') {
        this.errPrefix = 'please choose'
        } else {
          this.errPrefix = '';
        }
        break;
      case 'fname':
        if(this.registerForm.value.firstname === '') {
          this.fname = 'please input your firstname'
        } else {
          this.fname = '';
        }
        break;
      case 'lname':
        if(this.registerForm.value.lastname === '') {
        this.lname = 'please input your lastname'
      } else {
        this.fname = '';
      }
        break;
      case 'school':
        if(this.registerForm.value.school === '') {
          this.errSchool = 'please input your school'
        } else {
          this.errSchool = '';
        }
        break;
      case 'job':
        if(this.registerForm.value.jobtitle === '') {
          this.errJob = 'please input your job title'
        } else {
          this.errJob = '';
        }
        break;
      case 'ceeb':
        if(this.registerForm.value.ceebcode === '') {
          this.errCeeb = 'please input your CEEB Code'
        } else {
          const re = /^\d{6}$/;
          const ceeb = re.test(this.registerForm.value.ceebcode);
          if(ceeb) {
            this.errCeeb = '';
          } else {
            this.errCeeb = 'please input six CEEB CODE';
          }
        }
        break;
      case 'agreement':
        if(this.registerForm.value.agreement === '') {
          this.errAgree = 'please choose'
        } else {
          if(this.registerForm.value.agreement === 'yes') {
            this.hasReferee = true;
          } else {
            this.hasReferee = false;
          }
        }
        break;
      case 'rename':
        if(this.registerForm.value.rename === '') {
          this.errrename = 'please input First Referee'
        } else {
          this.errrename = '';
        }
        break;
      case 'reins':
        if(this.registerForm.value.reins === '') {
          this.errreins = 'please input Reference Institution'
        }else {
          this.errreins = '';
        }
        break;
      case 'remail':
        if(this.registerForm.value.remail === ''){
          this.errremail = 'please input Reference Email';
        } else {
          const re = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          const email = re.test(this.registerForm.value.remail2);
          if(email) {
            this.errremail =''
          } else {
            this.errremail = 'please input correct email'
          }
        }
        break;
      case 'rename2':
        if(this.registerForm.value.rename2 === '') {
          this.errrename2 = 'please input Second Referee'
        }else {
          this.errrename2 = '';
        }
        break;
      case 'reins2':
        if(this.registerForm.value.reins2 === '') {
          this.errreins2 = 'please input Reference Institution'
        }else {
          this.errreins2 = '';
        }
        break;
      case 'remail2':
        if(this.registerForm.value.remail2 === ''){
          this.errremail2 = 'please input Reference Email';
        } else {
          const re = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          const email = re.test(this.registerForm.value.remail2);
          if(email) {
            this.errremail2 =''
          } else {
            this.errremail2 = 'please input correct email'
          }
        }
        break;
      default:
        return;
    }
  }

  go(url) {
    this.navigateService.push();
    this.navigateService.pushToRoute(url);
  }

}


class Register {
  constructor(public work: string,
              public email: string,
              public code: string,
              public pwd1: string,
              public pwd2: string,
              public prefix: string,
              public firstname: string,
              public lastname: string,
              public preferredname: string,
              public school: string,
              public jobtitle: string,
              public ceebcode: string,
              public rename: string,
              public reins: string,
              public remail: string,
              public rename2: string,
              public reins2: string,
              public remail2: string,
              public agreement: string,
              ) {}
}

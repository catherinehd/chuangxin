import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { AppConfigService } from './app-config.service';

@Injectable()
export class UserService {

  constructor(private httpclientService: HttpClientService,
              private appconfigService: AppConfigService) { }

  //登录
  login(uName, loginPwd, uRem) {
    return this.httpclientService.getMethod({
      url: '/user/doLogin',
      data: {
        uName: uName,
        password: loginPwd,
        uRem: uRem
      }
    })
  }

  //验证是否记住密码
  rememberPW() {
    return this.httpclientService.getMethod( {
      url: '/user/Login'
    })
  }

  // 注册
  register(uName, userName, password, uPhone, uMail, uSex, uField, uCompany, uWeb) {
    return this.httpclientService.postMethod({
      url: '/user/doRegister',
      data: {
        uName: uName,
        userName: userName,
        password: password,
        uPhone: uPhone,
        uMail: uMail,
        uSex: uSex,
        uField: uField,
        uCompany: uCompany,
        uWeb: uWeb
      }
    });
  }

  // 注册时判断用户名是否被占用
  uNameUsed(uname) {
    return this.httpclientService.getMethod({
      url: '/user/checkuname/' + uname
    })
  }

  // 注册时判断手机号是否被占用
  uPhoneUsed(uphone) {
    return this.httpclientService.getMethod( {
      url: '/user/checkuphone/' + uphone
    })
  }

  //检查邮箱
  testEmail(email, type) {
    return this.httpclientService.postMethod({
      url: '/web/user/check/' + type,
      data: {
        param: email,
      }
    });
  }

  // 获取验证码  没有参数？
  getCode(userName) {
    return this.httpclientService.postMethod({
      url: '/user/valid',
    });
  }

  // 验证验证码
  testCode(uphone,code) {
    return this.httpclientService.postMethod({
      url: '/user/checkvalidReset/' + code,
      data: {
        uphone: uphone,
      }
    });
  }

  //修改密码   不需要旧密码？
  modifyPwd(uphone, np) {
    return this.httpclientService.postMethod({
      url: '/user/updatePassword',
      data: {
        uphone:uphone,
        np:np,
      }
    })
  }

  // 忘记密码 判断用户名是否被使用
  uNameUsedforgetPW(uphone) {
    return this.httpclientService.postMethod({
      url: '/user/checkuphonepass/' + uphone,
    });
  }

  // 忘记密码 提交新密码
  updatePwd(userName, password) {
    return this.httpclientService.postMethod({
      url: '/web/user/resetPassword',
      data: {
        userName: userName,
        password: password,
      }
    });
  }

  // 忘记密码 邮箱获取验证码
  getMsgCode(userName) {
    return this.httpclientService.postMethod({
      url: '/web/user/validReset/',
      data: {
        userName: userName,
      }
    });
  }

  //忘记密码 验证验证码是否正确
  testMsgCode(userName,code) {
    return this.httpclientService.postMethod({
      url: '/web/user/checkvalidReset/' + code,
      data: {
        userName: userName,
      }
    });
  }

  // 验证是否有用户登录
  userOn() {
    return this.httpclientService.postMethod({
      url: '/user/center',
    });
  }

  // 修改个人信息
  resetuInfo(uphone) {
    return this.httpclientService.postMethod({
      url: '/user/findUserByUserPhone/' + uphone,
    });
  }

  // 确认修改个人信息
  seruInfo() {
    return this.httpclientService.postMethod({
      url: '/user/updateUser/',
    });
  }


}

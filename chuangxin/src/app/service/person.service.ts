import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { AppConfigService } from './app-config.service';

@Injectable()
export class PersonService {

  constructor(private httpClientService: HttpClientService,
              private appConfigService: AppConfigService) { }

  // 登录
  login(uName, uPwd, uRem) {
    return this.httpClientService.getMethod({
      url: 'user/doLogin',
      data: {
        uName: uName,
        password: uPwd,
        uRem: uRem
      }
    });
  }

  // 注册
  // uName 用户名
  // userName 用户姓名
  // password 密码
  // uPhone 手机号
  // uMail 邮箱
  // uSex 性别
  // uField 所属领域   食品农业，电力通信，航空航天，化工领域，能源环境，建筑运输，生活教育，机械工业，电子信息，地质水利，医疗保健，计算机，其他
  // uCompany 单位名称
  // uWeb 所属网站
  register(uName, userName, pwd, uPhone, umail, usex, ufield, ucompany, uweb) {
    return this.httpClientService.postMethod({
      url: 'user/doRegister',
      data: {
        uName: uName,
        userName: userName,
        password: pwd,
        uPhone: uPhone,
        uMail: umail,
        uSex: usex,
        uField: ufield,
        uCompany: ucompany,
        uWeb: uweb
      }
    });
  }

  // 登录验证是否有记住密码
  hasRemPwd() {
    return this.httpClientService.getMethod({
      url: 'user/Login',
    });
  }

  // 注册手机号是否被占用
  testPhoneNumber(uPhone) {
    return this.httpClientService.getMethod({
      url: 'user/checkuphone/' + uPhone,
    });
  }

  // 注册用户名是否被占用
  testUserName(uName) {
    return this.httpClientService.getMethod({
      url: 'user/checkuname/' + uName,
    });
  }

  // 退出
  logOut() {
    return this.httpClientService.getMethod({
      url: 'user/logout',
    });
  }

  // 忘记密码手机号是否被使用
  userNameUsed(uPhone) {
    return this.httpClientService.getMethod({
      url: 'user/checkuphonepass/' + uPhone,
    });
  }

  // 忘记密码修改密码
  forgetpwd(np, uPhone) {
    return this.httpClientService.postMethod({
      url: 'user/updatePassword/',
      data: {
        np: np,
        uphone: uPhone
      }
    });
  }

  // 获取手机验证码
  getCode(uPhone) {
    return this.httpClientService.getMethod({
      url: 'user/valid',
      data: {
        uphone: uPhone
      }
    });
  }

  // 验证验证码
  testCode(code, uPhone) {
    return this.httpClientService.getMethod({
      url: 'user/checkvalidReset/' + code,
      data: {
        uphone: uPhone
      }
    });
  }

  // 修改密码
  editPwd(newPwd, uPhone) {
    return this.httpClientService.postMethod({
      url: 'user/updatePassword',
      data: {
        np: newPwd,
        uphone: uPhone
      }
    });
  }

  // 用户是否有登录
  testIsLogin() {
    return this.httpClientService.getMethod({
      url: 'user/center',
    });
  }

  // 获取用户信息
  editUserPhoneNumber(uphone) {
    return this.httpClientService.getMethod({
      url: 'user/findUserByUserPhone/' + uphone,
    });
  }

  // 确认用户信息修改
  editUserInfo(uName, userName, uPhone, umail, usex, ufield, ucompany, uId) {
    return this.httpClientService.postMethod({
      url: 'user/updateUser',
      data: {
        uName: uName,
        userName: userName,
        uPhone: uPhone,
        uMail: umail,
        uSex: usex,
        uField: ufield,
        uCompany: ucompany,
        uId: uId
      }
    });
  }

}

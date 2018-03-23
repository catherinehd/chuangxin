export class UserModel {


    createTime: string;
    prefix: string;
    updateTime: string;
    userAg: string;
    userCode: string;
    userFn: string;
    userInfoId: number;
    userJob:string;
    userLn: string;
    userPn: string;
    userRe: string;
    userRi: string;
    userRn: string;
    userSchool: string;




  constructor(options?: any) {
    if (options) {

      this.createTime = options.userInfo.createTime;
      this.prefix = options.userInfo.prefix;
      this.updateTime = options.userInfo.updateTime;
      this.userAg = options.userInfo.userAg;
      this.userCode = options.userInfo.userCode;
      this.userFn = options.userInfo.userFn;
      this.userInfoId = options.userInfo.userInfoId;
      this.userJob = options.userInfo.userJob;
      this.userLn = options.userInfo.userLn;
      this.userPn = options.userInfo.userPn;
      this.userRe = options.userInfo.userRe;
      this.userRi = options.userInfo.userRi;
      this.userRn = options.userInfo.userRn;
      this.userSchool = options.userInfo.userSchool;
    }
  }
}

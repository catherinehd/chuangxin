export class schoolModel {
  createTime: string;
  updateTime: null;
  usityId: number;
  usityName: string;
  usityUrl: string;
  usityState: number;
  usityNature: string;
  usityCountry: string;
  usityCity: string;
  usityRegion: string;
  usityOs: string;
  usityImage: string;
  usityTxt: string;
  usityinfo: {
    usityinfoId: number;
    usityinfoStart: string;
    usityinfoEnd: string;
    usityinfoScore: string;
    usityinfoTuition: string;
    usityinfoRole: number;
  }
  usityofficers: {
    uofficerId: number;
    uofficerName: string;
    uofficerJob: string;
    uofficerMail: string;
    uofficerUsityId: number;
    createTime: string;
    updateTime: string;
  }


  constructor(options?: any) {
    if (options) {
      this.createTime = options.create_time;
      this.updateTime = options.update_time;
      this.usityId = options.usity_id;
      this.usityName = options.usity_name;
      this.usityUrl= options.usity_url;
      this.usityState = options.usity_state;
      this.usityNature = options.usity_nature;
      this.usityCountry = options.usity_country;
      this.usityCity = options.usity_city;
      this.usityRegion = options.usity_region;
      this.usityOs = options.usity_os;
      this.usityImage = options.usity_image;
      this.usityTxt = options.usity_txt;
      this.usityinfo.usityinfoId = options.usityinfo.usityinfoId;
      this.usityinfo.usityinfoStart = options.usityinfo.usityinfoStart;
      this.usityinfo.usityinfoEnd = options.usityinfo.usityinfoEnd;
      this.usityinfo.usityinfoScore = options.usityinfo.usityinfoScore;
      this.usityinfo.usityinfoTuition = options.usityinfo.usityinfoTuition;
      this.usityinfo.usityinfoRole = options.usityinfo.usityinfoRole;
      this.usityofficers.uofficerId = options.usityofficers.uofficerId;
      this.usityofficers.uofficerName = options.usityofficers.uofficerName;
      this.usityofficers.uofficerJob = options.usityofficers.uofficerJob;
      this.usityofficers.uofficerMail = options.usityofficers.uofficerMail;
      this.usityofficers.uofficerUsityId = options.usityofficers.uofficerUsityId;
      this.usityofficers.createTime = options.usityofficers.createTime;
      this.usityofficers.updateTime = options.usityofficers.updateTime;
    }
  }
}

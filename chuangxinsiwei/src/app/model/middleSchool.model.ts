export class middleSchoolModel {
  createTime: string;
  updateTime: null;
  middleId: number;
  middleImage: string;
  middleName: string;
  middleCountry: string;
  middleCity: string;
  middleNum: number;
  middleCode: number;
  middleUrl: string;
  middleState: number;
  middleTxt: string;
  middleGuides: {
    createTime: number;
    updateTime: number
    middleGuideName: string;
    middleGuideJob: string;
    middleGuideMail: string;
    middleGuideNum: number;
    middleGuidePhone: string;
    middleGuideId: number;
    createBy: string;
    updateBy: string;
    guideId: number;
  }
  createBy: string;
  updateBy: string;


  constructor(options?: any) {
    if (options) {
      this.createTime = options.createTime;
      this.updateTime = options.updateTime;
      this.middleId = options.middleId;
      this.middleImage = options.middleImage;
      this.middleName = options.middleName;
      this.middleCountry = options.middleCountry;
      this.middleCity = options.middleCity;
      this.middleNum = options.middleNum;
      this.middleCode = options.middleCode;
      this.middleUrl = options.middleUrl;
      this.middleState = options.middleState;
      this.middleTxt = options.middleTxt;
      this.middleGuides.createTime = options.middleGuides.createTime;
      this.middleGuides.updateTime = options.middleGuides.updateTime;
      this.middleGuides.middleGuideName = options.middleGuides.middleGuideName;
      this.middleGuides.middleGuideJob = options.middleGuides.middleGuideJob;
      this.middleGuides.middleGuideMail = options.middleGuides.middleGuideMail;
      this.middleGuides.middleGuideNum = options.middleGuides.middleGuideNum;
      this.middleGuides.middleGuidePhone = options.middleGuides.middleGuidePhone;
      this.middleGuides.middleGuideId = options.middleGuides.middleGuideId;
      this.middleGuides.createBy = options.middleGuides.createBy;
      this.middleGuides.updateBy = options.middleGuides.updateBy;
      this.middleGuides.guideId = options.middleGuides.guideId;

    }
  }
}

export class newsPublicationModel {

  createTime: string;
  ncContent: string;
  ncId: number;
  ncRole: number;
  ncTime: number;
  ncTitle: string;
  ncUrl: string;
  updateTime: number;

  constructor(options?: any) {
    if (options) {
      this.createTime = options.createTime;
      this.ncContent = options.ncContent;
      this.ncId = options.ncId;
      this.ncRole = options.ncRole;
      this.ncTime = options.ncTime;
      this.ncTitle = options.ncTitle;
      this.ncUrl = options.ncUrl;
      this.updateTime = options.up_time;
      this.updateTime = options.updateTime;
    }
  }
}

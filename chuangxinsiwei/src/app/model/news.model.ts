export class newsModel {
  newsId: number;
  newsTheme: string;
  newsTime: string;
  state: number;
  createBy: string;
  createTime: string;
  updateBy:string;
  updateTime: string;
  newsPlace: string;
  newsPerson: string;
  newsImage: string;
  newsInfo: string;
  newsTitle: string;

  constructor(options?: any) {
    if (options) {
      this.newsId = options.id;
      this.newsTheme = options.theme;
      this.newsTime = options.time;
      this.state = options.state;
      this.createBy = options.cre_by;
      this.createTime = options.cre_time;
      this.updateBy = options.up_by;
      this.updateTime = options.up_time;
      this.newsPlace = options.place;
      this.newsPerson = options.person;
      this.newsImage = options.image;
      this.newsInfo = options.info;
      this.newsTitle = options.title;
    }
  }
}

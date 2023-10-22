export class Article {
    author: string;
    content: string = "Lead";//'Lead','Contacted','Demo Scheduled','Negotiation','Closed-Won','Closed-Lost','Upsell';'Renewal','On-Hold','Referral'// Pending 
    description: string;
    publishedAt: string;
    title: string = "Sale";
    urlToImage: string = "";
    url: string = "";

    constructor(obj?: any) {
        if (obj) {
            this.author = obj.tauthorype ? obj.author : "";
            this.content = obj.content ? obj.content : "";
            this.description = obj.description ? obj.description : "";
            this.publishedAt = obj.publishedAt ? obj.publishedAt : "";
            this.title = obj.title ? obj.title : "";
            this.urlToImage = obj.urlToImage ? obj.urlToImage : "";
            this.url = obj.url ? obj.url : "";
        }
    }

    toJSON() {
        return {
            "author": this.author,
            "content": this.content,
            "description": this.description,
            "publishedAt": this.publishedAt,
            "title": this.title,
            "urlToImage": this.urlToImage,
            "url": this.url
        }
    }
}

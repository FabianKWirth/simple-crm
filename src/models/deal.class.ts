export class Deal {
    status: String = "Lead";//'Lead','Contacted','Demo Scheduled','Negotiation','Closed-Won','Closed-Lost','Upsell';'Renewal','On-Hold','Referral'// Pending 
    userId: String;
    volume: Number = 0;
    type: String = "Sale";
    description: String = "";

    constructor(){
        this.status = this.status ? this.status : "";
        this.userId = this.userId ? this.userId : "";
        this.volume = this.volume ? this.volume : 0;
        this.type = this.type ? this.type : "Sale";
        this.description = this.description ? this.description : "";
    }

    toJSON() {
        return {
            "status": this.status,
            "userId": this.userId,
            "volume": this.volume,
            "type": this.type,
            "description": this.description,
        }
    }

}



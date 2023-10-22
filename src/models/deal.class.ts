export class Deal {
    id: string;
    status: string = "Lead";//'Lead','Contacted','Demo Scheduled','Negotiation','Closed-Won','Closed-Lost','Upsell';'Renewal','On-Hold','Referral'// Pending 
    userId: string;
    volume: number;
    type: string = "Sale";
    description: string = "";

    constructor(obj?: any) {
        if (obj) {
            this.type = obj.type ? obj.type : "Sale";
            this.id = obj.id ? obj.id : "";
            this.status = obj.status ? obj.status : "";
            this.userId = obj.userId ? obj.userId : "";
            this.volume = obj.volume ? obj.volume : 0;
            this.description = obj.description ? obj.description : "";
        } else {
            this.type = "";
            this.id = "";
            this.status = "";
            this.userId = "";
            this.volume = 0;
            this.description = "";
        }
    }

    toJSON() {
        return {
            "id": this.id,
            "status": this.status,
            "userId": this.userId,
            "volume": this.volume,
            "type": this.type,
            "description": this.description,
        }
    }
}



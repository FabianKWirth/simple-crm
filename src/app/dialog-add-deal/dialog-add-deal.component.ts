import { Component, Input } from '@angular/core';
import { Deal } from 'src/models/deal.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss']
})
export class DialogAddDealComponent {

  deal: Deal;
  @Input() userId: string;

  dealStatusTypes: string[] = ['Lead', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Upsell', 'Renewal', 'On-Hold', 'Referral'];
  loading = false;
  dialog: any;

  constructor(public dialogRef: MatDialogRef<DialogAddDealComponent>, public firebaseService: FirebaseService) {
    this.deal = new Deal();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveDeal() {
    this.deal.userId=this.userId;
    this.loading = true;
    console.log(this.deal);

    this.firebaseService.loadedDeals.push(this.deal);
    this.firebaseService.updateDeal(this.deal)
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });
  }

}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Deal } from 'src/models/deal.class';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-dialog-edit-deal',
  templateUrl: './dialog-edit-deal.component.html',
  styleUrls: ['./dialog-edit-deal.component.scss']
})
export class DialogEditDealComponent {
  deal: Deal;
  
  dealStatusTypes: string[] = ['Lead', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Upsell', 'Renewal', 'On-Hold', 'Referral'];
  loading: boolean = false;
  dialog: any;
  
  constructor(public dialogRef: MatDialogRef<DialogEditDealComponent>, public firebaseService: FirebaseService) {
    this.deal = new Deal();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveDeal() {
    this.loading = true;
    console.log(this.deal);

    this.firebaseService.updateDeal(this.deal)
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });
  }

}


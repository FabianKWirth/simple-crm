import { Component, Inject, inject, Input } from '@angular/core';
import { Deal } from 'src/models/deal.class';
import { Firestore } from '@angular/fire/firestore/';
import { addDoc, collection } from "firebase/firestore";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss']
})
export class DialogAddDealComponent {

  deal: Deal = new Deal();
  @Input() userId: string;

    dealStatusTypes: string[] =['Lead', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Upsell', 'Renewal', 'On-Hold', 'Referral'];
  loading = false;
  dialog: any;
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddDealComponent>,@Inject(MAT_DIALOG_DATA) data: any) {
    this.deal.userId = data.userId;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveDeal() {
    const usersRef = collection(this.firestore, "deals");
    this.loading = true;
    addDoc(usersRef, this.deal.toJSON()).then(() => {
      console.log("Data saved Successfully");
      this.loading = false;
      this.closeDialog();
    })
  }

}

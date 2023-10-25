import { Component, Input } from '@angular/core';
import { Deal } from 'src/models/deal.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss']
})
export class DialogAddDealComponent {
  dealForm: FormGroup;
  deal: Deal;
  @Input() userId: string;

  dealStatusTypes: string[] = ['Lead', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Upsell', 'Renewal', 'On-Hold', 'Referral'];
  loading = false;
  dialog: any;

  constructor(public dialogRef: MatDialogRef<DialogAddDealComponent>, public firebaseService: FirebaseService, private fb: FormBuilder) {
    this.deal = new Deal();
    this.dealForm = this.fb.group({
      status: ['', Validators.required],
      description: '',
      volume: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }


  saveDeal(): void {
    if (this.dealForm.valid) {
      this.deal.userId = this.userId;
      this.loading = true;
      this.firebaseService.updateDeal(this.deal)
        .then(() => {
          if (this.firebaseService.loadedDeals) {
            this.firebaseService.loadedDeals.push(this.deal);
          }else{
            this.firebaseService.loadDeals();
          }
          this.loading = false;
          this.closeDialog();
        });
    } else {
      // Form is invalid, display error messages
      this.dealForm.markAllAsTouched();
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dealForm: FormGroup;
  userId: string;

  constructor(public dialogRef: MatDialogRef<DialogEditDealComponent>, public firebaseService: FirebaseService, private fb: FormBuilder) {
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
      this.loading = true;

      this.firebaseService.updateDeal(this.deal)
        .then(() => {
          if (this.firebaseService.loadedDeals) {
            this.firebaseService.loadedDeals.push(this.deal);
          } else {
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


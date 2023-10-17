import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore/';
import { doc, updateDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {

  private firestore: Firestore = inject(Firestore);
  user: User;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateUser() {
    const id = this.user.id;
    const docInstance = doc(this.firestore, "users", id);
    const updateData = this.user.toJSON();

    updateDoc(docInstance, updateData).
      then(() => {
        console.log('Data Updated')
        this.closeDialog();
      })
      .catch((err) => {
        console.log(err);
      })
  }

}

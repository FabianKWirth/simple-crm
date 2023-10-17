import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  loading: boolean = false;
  birthDate: Date;
  user: User;
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){

  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateUser() {
    console.log(this.user.id);
    const docInstance = doc(this.firestore, "users", this.user.id);
    const updateData = this.user.toJSON()

    updateDoc(docInstance, updateData).
      then(() => console.log('Data Updated'))
      .catch((err) => {
        console.log(err);
      })
  }
}

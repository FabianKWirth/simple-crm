import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore/';
import { doc, updateDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {

  private firestore: Firestore = inject(Firestore);
  user: User;
  loading: boolean = false;

  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const id = this.user.id;
      const docInstance = doc(this.firestore, "users", id);
      const updateData = this.user.toJSON();

      this.loading = true;
      updateDoc(docInstance, updateData).
        then(() => {
          this.closeDialog();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      // Form is invalid, display error messages
      this.userForm.markAllAsTouched();
    }
  }



  closeDialog() {
    this.dialogRef.close();
  }

}

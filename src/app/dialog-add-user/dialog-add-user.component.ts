import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore/';
import { addDoc, collection } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date;

  userForm: FormGroup;
  loading: boolean = false;

  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required, this.dateValidator]],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  dateFilter = (date: Date): boolean => {
    const year1900 = new Date(1900, 0, 1); // January 1, 1900
    return date >= year1900 && date <= new Date(); // Only allow dates from 1900 to the present
  };

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value) {
      const birthDate = new Date(control.value);
      const currentDate = new Date();
      if (birthDate > currentDate) {
        return { futureDate: true };
      }
    }
    return null;
  }




  ngOnInit() {
  }


  saveUser(): void {
    if (this.userForm.valid) {
      this.user.birthDate = this.birthDate.getTime();
      const usersRef = collection(this.firestore, "users");
      this.loading = true;
      addDoc(usersRef, this.user.toJSON()).then(() => {
        this.loading = false;
        this.closeDialog();
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

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { doc, updateDoc } from 'firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent implements OnInit {
  loading: boolean = false;
  user: User;
  birthDate: Date;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firebaseService: FirebaseService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      birthDate: [null, Validators.required],
    });
  }

  ngOnInit() {
    // Initialize birthDate after user data is available
    this.birthDate = new Date(this.user.birthDate);
  }



  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.birthDate = event.value; // Assign the selected date to birthDate
  }

  closeDialog() {
    this.dialogRef.close();
  }


  updateUser(): void {
    if (this.userForm.valid) {
      this.user.birthDate = this.birthDate.getTime();
      console.log(this.birthDate.getTime());

      this.loading = true;
      this.firebaseService.updateUserDoc(this.user.id, this.user.toJSON())
        .then(() => {
          this.closeDialog();
          this.loading = false;
        })
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
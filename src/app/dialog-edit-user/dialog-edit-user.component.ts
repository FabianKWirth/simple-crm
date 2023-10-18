import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { doc, updateDoc } from 'firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent implements OnInit {
  loading: boolean = false;
  user: User;
  birthDate: Date;

  ngOnInit() {
    // Initialize birthDate after user data is available
    this.birthDate = new Date(this.user.birthDate);
  }

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firebaseService: FirebaseService
  ) {}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.birthDate = event.value; // Assign the selected date to birthDate
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.birthDate.getTime());

    this.loading = true;
    this.firebaseService.updateUserDoc(this.user.id,this.user.toJSON())
    .then(() => {
      this.closeDialog();
      this.loading = false;
    })
  }
}
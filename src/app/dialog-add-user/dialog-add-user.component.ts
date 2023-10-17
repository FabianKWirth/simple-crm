import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore/';
import { addDoc, collection } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date;


  loading: boolean = false;

  private firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  ngOnInit() {
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    const usersRef = collection(this.firestore, "users");
    this.loading = true;
    addDoc(usersRef, this.user.toJSON()).then(() => {
      console.log("Data saved Successfully");
      this.loading = false;
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

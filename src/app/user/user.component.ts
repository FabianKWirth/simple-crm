import { Component, OnInit, inject } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection } from "firebase/firestore";
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();
  userData$: Observable<any>;
  //Es wird ein Exemplar von Firestore erzeugt und der Variable firestore zugewiesen

  userList = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {

    this.getUsers();
  }

 

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getUsers() {
    const usersRef = this.getUsersRef();
    this.userData$ = collectionData(usersRef, { idField: "id" });
  }



}





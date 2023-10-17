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

  private firestore: Firestore = inject(Firestore);
  //Es wird ein Exemplar von Firestore erzeugt und der Variable firestore zugewiesen

  userList = [];

  constructor(public dialog: MatDialog) {

    this.getUsers();
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


  getUsers() {
    const usersRef = this.getUsersRef();
    this.userData$ = collectionData(usersRef, { idField: "id" });
  }

}





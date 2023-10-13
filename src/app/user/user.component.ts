import { Component, OnInit, inject } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFireModule } from '@angular/fire/compat';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();

  items$;
  items;

  //private database: Database = inject(Database);

  private firestore: Firestore = inject(Firestore);
  //Es wird ein Exemplar von Firestore erzeugt und der Variable firestore zugewiesen


  constructor(public dialog: MatDialog) {
    console.log(this.getUsersRef());
    this.items$ = collectionData(this.getUsersRef());
    this.items = this.items$.subscribe((list) => {
      list.array.forEach(element => {
        console.log(element);
      });
    });
    console.log(this.items);
    this.items.unsubscribe();
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

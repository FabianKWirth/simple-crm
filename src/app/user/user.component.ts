import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { FirebaseService } from 'src/services/firebase.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User = new User();
  userData$: Observable<User[]>;
  userList: User[] = [];

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsers() {
    this.userData$ = this.firebaseService.getUsers();
  }
}

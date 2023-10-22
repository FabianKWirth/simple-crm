import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  userList: User[] = [];

  constructor(public dialog: MatDialog, public firebaseService: FirebaseService) {
    
  }

  ngOnInit(): void {
    this.firebaseService.loadUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

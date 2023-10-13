import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore/';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date;
  users$: Observable<any[]>;
  private database: Database = inject(Database);

  private firestore: Firestore = inject(Firestore);

  constructor() {
  }

  ngOnInit() {
    console.log(this.database);
    console.log(this.firestore);

  }

  saveUser() {
    console.log(this.birthDate);
    this.user.birthDate = this.birthDate.getTime();
  }
}

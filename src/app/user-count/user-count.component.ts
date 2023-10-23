import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.scss']
})
export class UserCountComponent implements OnInit {
  totalCostumers: number = 0;

  constructor(public firebaseService: FirebaseService) {

  }

  ngOnInit() {
    if (!Array.isArray(this.firebaseService.loadedUser)) {
      this.firebaseService.loadUsers();
    }
  }

  getTotalCostumers() {
    return this.firebaseService.loadedUsers.length;
  }
}

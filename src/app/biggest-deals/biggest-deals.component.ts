import { Component } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-biggest-deals',
  templateUrl: './biggest-deals.component.html',
  styleUrls: ['./biggest-deals.component.scss']
})
export class BiggestDealsComponent {
  formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  
   constructor(public firebaseService: FirebaseService) {
    this.firebaseService.loadBiggestDeals();
  }

  getUser(targetUserId: string) {
    if (!this.firebaseService.loadedUsers) {
      this.firebaseService.loadUsers();
    }

    const foundUser = this.firebaseService.loadedUsers.find(user => user.id === targetUserId);
    if (foundUser) {
      return foundUser.firstName + " " + foundUser.lastName;
    } else {
      return "unknown user";
    }
  }
}

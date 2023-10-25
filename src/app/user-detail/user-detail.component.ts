import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { FirebaseService } from 'src/services/firebase.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [FirebaseService]
})
export class UserDetailComponent implements OnInit {
  userId: string = "";

  showMessage: Boolean = false;
  message: string = "";
  messageType: string = "";


  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firebaseService: FirebaseService, private router: Router, public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.firebaseService.loadDeals("userId", this.userId);
      this.firebaseService.loadUser(this.userId);

    })
  }

  deleteUser() {
    this.firebaseService.deleteUser(this.userId);
    this.notificationService.showUserDeleteMessage();
    setTimeout(() => { 
      this.router.navigate(["user"]);
  }, 2000);

}


editAddressDetail() {
  const dialog = this.dialog.open(DialogEditAddressComponent);
  dialog.componentInstance.user = new User(this.firebaseService.loadedUser.toJSON());
}

editUserDetail() {
  const dialog = this.dialog.open(DialogEditUserComponent);
  dialog.componentInstance.user = new User(this.firebaseService.loadedUser.toJSON());
}

addDeal() {
  const dialog = this.dialog.open(DialogAddDealComponent);
  dialog.componentInstance.userId = this.userId;
}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: string = "";
  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.firebaseService.loadDeals("userId", this.userId);
      this.firebaseService.loadUser(this.userId);
    })
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

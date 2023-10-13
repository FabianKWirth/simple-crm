import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore/';
import { collection, doc, setDoc } from "firebase/firestore";



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date;

  //private database: Database = inject(Database);

  private firestore: Firestore = inject(Firestore);
  //Es wird ein Exemplar von Firestore erzeugt und der Variable firestore zugewiesen

  constructor() {
  }

  ngOnInit() {

  }

  async saveUser() {
    console.log(this.birthDate);
    this.user.birthDate = this.birthDate.getTime();
    const usersRef = collection(this.firestore, "users");
    await setDoc(doc(usersRef), this.user.toJSON());
  }
}

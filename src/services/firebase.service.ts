import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection, doc, onSnapshot, updateDoc, query, where, getDocs } from "firebase/firestore";
import { Observable } from 'rxjs';
import { Deal } from 'src/models/deal.class';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  dealsData$: Observable<Deal[]>
  unsubDeals;
  public dealsList: any[] = [];

  ngOnDestroy() {
    this.unsubDeals();
  }

  constructor(private firestore: Firestore) { }

  private getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getUsers(): any {
    const usersRef = this.getUsersRef();
    return collectionData(usersRef);
  }

  async updateUserDoc(userId, updateData) {
    const docInstance = doc(this.firestore, 'users', userId);
    updateDoc(docInstance, updateData);
  }



  getDealsRef(userId?: String) {
    if(!userId){
      return query(collection(this.firestore, 'deals'));
    }else{
      return query(collection(this.firestore, 'deals'), where("userId","==",userId));
    }
  }

  async loadDealsOfUser(userId?: String) {
    const dealsRef = this.getDealsRef(userId);


    this.unsubDeals = onSnapshot(dealsRef, (list) => {
      this.dealsList = [];
      list.forEach(e => {
        this.dealsList.push(e.data());
      })
    });

    return this.dealsList;
  }
}

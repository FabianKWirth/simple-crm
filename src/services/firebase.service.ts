import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection, doc, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Deal } from 'src/models/deal.class';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  unsubUserData: any;
  loadedDeals: Deal[];
  unsubDeals: any;

  unsubbiggestDealsData: any;
  loadedBiggestDeals: Deal[];

  unsubUsers: any;
  loadedUsers: User[];
  loadedUser: User;


  constructor(private firestore: Firestore) { }

  async loadUser(userId) {
    const userRef = doc(this.firestore, "users", userId);
    this.unsubUserData = onSnapshot(userRef, (doc) => {
      this.loadedUser = new User(doc.data());
      this.loadedUser.id = userId;
    });
  }

  async updateUserDoc(userId, updateData) {
    const docInstance = doc(this.firestore, 'users', userId);
    updateDoc(docInstance, updateData);
  }

  async updateDeal(deal: Deal) {
    if (deal.id == "") {
      const docInstance = doc(collection(this.firestore, "deals"));
      setDoc(docInstance, deal.toJSON());
      console.log("deal created");
    } else {
      const docInstance = doc(this.firestore, 'deals', deal.id);
      updateDoc(docInstance, deal.toJSON());
      console.log("deal updated");
    }
  }

  getQuery(indexName?: any, indexValue: String = "") {
    if (indexName) {
      return query(collection(this.firestore, "deals"), where(indexName, "==", indexValue));
    } else {
      return query(collection(this.firestore, "deals"));
    }
  }

  /**
  * Asynchronously loads deals data from Firestore based on optional index parameters.
  *
  * @param {any} indexName - (Optional) The name of the index to filter Deals.
  * @param {String} indexValue - (Optional) The value to filter Deals by within the specified index.
  */
  async loadDeals(indexName?: any, indexValue: String = "") {
    const q = this.getQuery(indexName, indexValue);
    if (!this.unsubDeals) {
      this.unsubDeals = onSnapshot(q, (querySnapshot) => {
        this.loadedDeals = [];
        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          const deal = new Deal(docData);
          deal.id = doc.id;
          this.loadedDeals.push(deal);
        })
      });
    }
  };


  getBiggestDealsQuery() {
    return query(collection(this.firestore, "deals"), orderBy("volume", "desc"), limit(5));
  }

  /**
    * Asynchronously loads deals data from Firestore based on optional index parameters.
    *
    * @param {any} indexName - (Optional) The name of the index to filter Deals.
    * @param {String} indexValue - (Optional) The value to filter Deals by within the specified index.
    */
  async loadBiggestDeals() {
    const q = this.getBiggestDealsQuery();
    this.unsubbiggestDealsData = onSnapshot(q, (querySnapshot) => {
      this.loadedBiggestDeals = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        const deal = new Deal(docData);
        deal.id = doc.id;
        this.loadedBiggestDeals.push(deal);
      })
    })
  }

  getQueryUsers(indexName?: any, indexValue: String = "") {
    if (indexName) {
      return query(collection(this.firestore, "users"), where(indexName, "==", indexValue));
    } else {
      return query(collection(this.firestore, "users"));
    }
  }

  /**
* Asynchronously loads deals data from Firestore based on optional index parameters.
*s
* @param {any} indexName - (Optional) The name of the index to filter Deals.
* @param {String} indexValue - (Optional) The value to filter Deals by within the specified index.
*/
  async loadUsers(indexName?: any, indexValue: String = "") {
    const q = this.getQueryUsers(indexName, indexValue);
    this.unsubUsers = onSnapshot(q, (querySnapshot) => {
      this.loadedUsers = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        const user = new User(docData);
        user.id = doc.id;
        this.loadedUsers.push(user);
      })
    });
  };


  ngOnDestroy() {
    if (this.unsubUsers) {
      this.unsubUsers();
    }

    if (this.unsubDeals) {
      this.unsubDeals();
    }

    if (this.unsubUserData) {
      this.unsubUserData();
    }

    if (this.unsubbiggestDealsData) {
      this.unsubbiggestDealsData();
    }
  }
}

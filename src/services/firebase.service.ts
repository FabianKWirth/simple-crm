import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection, doc, updateDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  private getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getUsers(): any {
    const usersRef = this.getUsersRef();
    return collectionData(usersRef);
  }
  
  async updateUserDoc(userId,updateData){
    const docInstance = doc(this.firestore, 'users', userId);
    updateDoc(docInstance, updateData);
  }  
}

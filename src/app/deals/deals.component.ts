import { Component, Input } from '@angular/core'
import { MatTableModule } from '@angular/material/table';
import { Firestore, collectionData } from '@angular/fire/firestore/';
import { collection } from "firebase/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {
  @Input() userId: String;
  dealsData$: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getDeals();
  }

  getDealsRef() {
    return collection(this.firestore, 'deals');
  }

  getDeals() {
    const dealsRef= this.getDealsRef();
    this.dealsData$ = collectionData(dealsRef, { idField: "id" });
  }



  
}

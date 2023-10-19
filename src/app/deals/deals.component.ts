import { Component, Input } from '@angular/core'
import { FirebaseService } from 'src/services/firebase.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Deal } from 'src/models/deal.class';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {
  @Input() userId: String = "";
  currentDeals: Deal[];

  private aChangeSubject = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor(private firebaseService: FirebaseService) {
    this.loadDeals();
  }


  async loadDeals() {
    if (this.userId != "") {
      await this.firebaseService.loadDealsOfUser(this.userId);
    } else {
      await this.firebaseService.loadDealsOfUser(this.userId);
    }

    this.aChangeSubject.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.currentDeals=this.firebaseService.dealsList;
      console.log(this.currentDeals);
    });
  }

}
